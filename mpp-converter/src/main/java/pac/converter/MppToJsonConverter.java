package pac.converter;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Task;
import net.sf.mpxj.Relation;
import net.sf.mpxj.RelationType;
import net.sf.mpxj.ProjectReader;
import net.sf.mpxj.reader.UniversalProjectReader;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class MppToJsonConverter {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final DateTimeFormatter isoFormatter = DateTimeFormatter.ISO_DATE_TIME;

    public static void main(String[] args) {
        if (args.length < 2) {
            System.err.println("Uso: java -jar mpp-converter.jar <input.mpp> <output.json>");
            System.exit(1);
        }

        String inputPath = args[0];
        String outputPath = args[1];

        try {
            System.out.println("Convirtiendo: " + inputPath);
            ObjectNode result = convertMppToJson(inputPath);

            // Guardar JSON
            mapper.writerWithDefaultPrettyPrinter().writeValue(new File(outputPath), result);
            System.out.println("✓ Guardado en: " + outputPath);
            System.out.println("✓ Conversión exitosa");
        } catch (Exception e) {
            System.err.println("✗ Error: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    public static ObjectNode convertMppToJson(String mppPath) throws Exception {
        ProjectReader reader = new UniversalProjectReader();
        ProjectFile project = reader.read(mppPath);

        ObjectNode root = mapper.createObjectNode();

        // Información del proyecto
        root.put("nombre", project.getProjectTitle() != null ? project.getProjectTitle() : "Proyecto");
        root.put("archivo", new File(mppPath).getName());
        root.put("fecha", LocalDateTime.now().format(isoFormatter));
        root.put("version", 1);

        // Convertir tareas
        ArrayNode tareasArray = mapper.createArrayNode();
        Map<Integer, Integer> taskIdMap = new HashMap<>();
        int taskIndex = 1;

        for (Task task : project.getTasks()) {
            if (task != null) {
                taskIdMap.put(task.getID(), taskIndex);
                ObjectNode taskNode = convertTask(task, project);
                tareasArray.add(taskNode);
                taskIndex++;
            }
        }

        root.set("tareas", tareasArray);

        // Convertir dependencias/predecesoras
        ArrayNode predecesoresArray = mapper.createArrayNode();
        int predIndex = 1;

        for (Task task : project.getTasks()) {
            if (task != null && task.getPredecessors() != null) {
                for (Relation relation : task.getPredecessors()) {
                    ObjectNode predNode = mapper.createObjectNode();
                    predNode.put("id", "p" + predIndex);

                    // ID de la tarea actual (como UUID/ID)
                    Task predTask = relation.getTargetTask();
                    Task currentTask = relation.getSourceTask();

                    // Buscar en el array de tareas para obtener los IDs generados
                    String taskId = findTaskIdInArray(tareasArray, currentTask.getID());
                    String predTaskId = findTaskIdInArray(tareasArray, predTask.getID());

                    predNode.put("tareaId", taskId);
                    predNode.put("predecesora", predTaskId);
                    predNode.put("tipo", getTipoDependencia(relation.getType()));
                    predNode.put("lag", relation.getLag() != null ? relation.getLag().getDuration() : 0);

                    predecesoresArray.add(predNode);
                    predIndex++;
                }
            }
        }

        root.set("predecesoras", predecesoresArray);

        return root;
    }

    private static ObjectNode convertTask(Task task, ProjectFile project) {
        ObjectNode node = mapper.createObjectNode();

        String taskId = UUID.randomUUID().toString();
        node.put("id", taskId);
        node.put("taskId", task.getID());

        Task parent = task.getParentTask();
        node.put("parent", parent != null ? parent.getID() : null);

        String outline = task.getOutlineNumber();
        node.put("outline", outline != null ? outline : null);

        Integer outlineLevel = task.getOutlineLevel();
        node.put("outlineLevel", outlineLevel != null ? outlineLevel : 1);

        node.put("nombre", task.getName() != null ? task.getName() : "");

        // Fechas en formato ISO
        if (task.getStart() != null) {
            node.put("inicio", task.getStart().toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME));
        } else {
            node.putNull("inicio");
        }

        if (task.getFinish() != null) {
            node.put("fin", task.getFinish().toLocalDateTime().format(DateTimeFormatter.ISO_DATE_TIME));
        } else {
            node.putNull("fin");
        }

        // Duración en días
        if (task.getDuration() != null) {
            double durationDays = task.getDuration().getDuration();
            node.put("duracion", Math.round(durationDays * 100.0) / 100.0);
        } else {
            node.putNull("duracion");
        }

        // Avance (porcentaje)
        if (task.getPercentageComplete() != null) {
            node.put("avance", task.getPercentageComplete().intValue());
        } else {
            node.putNull("avance");
        }

        // Ruta crítica
        node.put("critical", task.getCritical());

        // Información adicional como JSON
        ObjectNode extra = mapper.createObjectNode();
        if (task.getText(1) != null) extra.put("custom1", task.getText(1));
        if (task.getNotes() != null) extra.put("notes", task.getNotes());
        if (task.getResourceNames() != null) extra.put("resources", task.getResourceNames());

        if (extra.size() > 0) {
            node.set("jsonExtra", extra);
        } else {
            node.putNull("jsonExtra");
        }

        return node;
    }

    private static String getTipoDependencia(RelationType type) {
        if (type == null) return "FS";

        return switch (type) {
            case FINISH_START -> "FS";
            case START_START -> "SS";
            case FINISH_FINISH -> "FF";
            case START_FINISH -> "SF";
        };
    }

    private static String findTaskIdInArray(ArrayNode array, Integer mpxjId) {
        for (int i = 0; i < array.size(); i++) {
            ObjectNode task = (ObjectNode) array.get(i);
            if (task.get("taskId").asInt() == mpxjId) {
                return task.get("id").asText();
            }
        }
        return UUID.randomUUID().toString();
    }
}
