import { Flex } from "@chakra-ui/react";
import { Badge } from "@ui/Badge";
import { RoadmapVersion } from "workspaces/cms-data/src/roadmap";

export default function RoadmapPostVersion({
  roadmapVersion,
}: {
  roadmapVersion?: RoadmapVersion;
}) {
  return (
    <Flex gap="0.5rem" flexWrap="wrap">
      <Badge variant={roadmapVersion?.color}>
        {roadmapVersion?.version}
      </Badge>
      <Badge variant={roadmapVersion?.color} sx={{textWrap: "wrap"}}>
        {roadmapVersion?.impact}
      </Badge>
    </Flex>
  );
}
