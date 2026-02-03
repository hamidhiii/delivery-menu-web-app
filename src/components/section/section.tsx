import { Card } from "../card/card";
import "./section.scss";

interface IProps {
  title: string;
  childs: string[];
  sectionId: string;
}

export function Section(props: IProps): React.ReactElement {
  const { childs, title, sectionId } = props;

  return (
    <div id={sectionId} className="section">
      <h3 className="section__title">{title}</h3>

      <div className="section__items">
        {childs?.map((_, index) => <Card key={index} />)}
      </div>
    </div>
  );
}
