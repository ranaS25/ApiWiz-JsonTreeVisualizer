export const sanitizeEdges = (rawEdges) =>
  rawEdges.map((e) => {
    const copy = { ...e };
    if (!copy.sourceHandle) delete copy.sourceHandle;
    if (!copy.targetHandle) delete copy.targetHandle;
    return copy;
  });
