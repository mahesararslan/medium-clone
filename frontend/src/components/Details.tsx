import parse from "html-react-parser";

const Details = ({ description }: { description:any }) => {

  return (
    <>
      <div>{description}</div>
      <div className="ProseMirror">{parse(description)}</div>
    </>
  );
};

export default Details;