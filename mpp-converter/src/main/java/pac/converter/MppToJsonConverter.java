package pac.converter;

import net.sf.mpxj.ProjectFile;
import net.sf.mpxj.Task;
import net.sf.mpxj.Relation;
import net.sf.mpxj.RelationType;
import net.sf.mpxj.reader.UniversalProjectReader;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.File;
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
        UniversalProjectReader reader = new UniversalProjectReader();
        ProjectFile project = reader.read(mppPath);

        ObjectNode root = mapper.createObjectNode();

        String projectName = new File(mppPath).getName().replace(".mpp", "");
        root.put("nombre", projectName);
        root.put("archivo", new File(mppPath).getName());
        root.put("fecha", LocalDateTime.now().format(isoFormatter));
        root.put("version", 1);

        ArrayNode tareasArray = mapper.createArrayNode();
        int taskIndex = 1;

        for (Task task : project.getTasks()) {
            if (task != null) {
                ObjectNode taskNode = convertTask(task, taskIndex);
                tareasArray.add(taskNode);
                taskIndex++;
            }
        }

        root.set("tareas", tareasArray);

        ArrayNode predecesoresArray = mapper.createArrayNode();
        int predIndex = 1;

        for (Task task : project.getTasks()) {
            if (task != null && task.getPredecessors() != null) {
                for (Relation relation : task.getPredecessors()) {
                    ObjectNode predNode = mapper.createObjectNode();
                    predNode.put("id", "p" + predIndex);
                    predNode.put("tareaId", UUID.randomUUID().toString());
                    predNode.put("predecesora", UUID.randomUUID().toString());
                    predNode.put("tipo", getTipoDependencia(relation.getType()));
                    predNode.put("lag", 0);

                    predecesoresArray.add(predNode);
                    predIndex++;
                }
            }
        }

        root.set("predecesoras", predecesoresArray);

        return root;
    }

    private static ObjectNode convertTask(Task task, int index) {
        ObjectNode node = mapper.createObjectNode();

        String taskId = UUID.randomUUID().toString();
        node.put("id", taskId);
        node.put("taskId", task.getID() != null ? task.getID() : index);

        Task parent = task.getParentTask();
        node.put("parent", parent != null ? parent.getID() : null);

        String outline = task.getOutlineNumber();
        node.put("outline", outline != null ? outline : null);

        Integer outlineLevel = task.getOutlineLevel();
        node.put("outlineLevel", outlineLevel != null ? outlineLevel : 1);

        node.put("nombre", task.getName() != null ? task.getName() : "");

        if (task.getStart() != null) {
            node.put("inicio", task.getStart().format(DateTimeFormatter.ISO_DATE_TIME));
        } else {
            node.putNull("inicio");
        }

        if (task.getFinish() != null) {
            node.put("fin", task.getFinish().format(DateTimeFormatter.ISO_DATE_TIME));
        } else {
            node.putNull("fin");
        }

        if (task.getDuration() != null) {
            double durationDays = task.getDuration().getDuration();
            node.put("duracion", Math.round(durationDays * 100.0) / 100.0);
        } else {
            node.putNull("duracion");
        }

        if (task.getPercentageComplete() != null) {
            node.put("avance", task.getPercentageComplete().intValue());
        } else {
            node.putNull("avance");
        }

        node.put("critical", task.getCritical());

        ObjectNode extra = mapper.createObjectNode();
        if (task.getNotes() != null) {
            extra.put("notes", task.getNotes());
        }

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
}
