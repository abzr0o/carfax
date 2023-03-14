import PDFMerger from "pdf-merger-js";

const merge = async (pdf1: Buffer, pdf2: Buffer, name: string) => {
  const merger = new PDFMerger();
  await merger.add(pdf1);
  await merger.add(pdf2);
  await merger.save(`${name}.pdf`);
  return merger;
};

export default merge;
