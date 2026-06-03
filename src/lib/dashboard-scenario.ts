import type { FlowNodeId } from "@/lib/dashboard-config";

export function getNodeIds(nodes: { id: FlowNodeId }[]): FlowNodeId[] {
  return nodes.map((n) => n.id);
}

/** Nodes present in the new scenario but not the previous one */
export function getAddedNodeIds(
  previous: FlowNodeId[],
  next: FlowNodeId[]
): FlowNodeId[] {
  const prevSet = new Set(previous);
  return next.filter((id) => !prevSet.has(id));
}
