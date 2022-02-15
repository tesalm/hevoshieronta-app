import { Accordion } from 'react-bootstrap';

const executeScroll = async (ref) => {
  if (ref.target.type === "button")
    setTimeout(() => {ref.target.scrollIntoView({behavior:"smooth"})}, 200);
};

const AccordionItem = ({header, body, ekey="0", bodyStyle="p-3"}) => (
  <Accordion.Item eventKey={ekey} onClick={executeScroll}>
    <Accordion.Header>{header}</Accordion.Header>
    <Accordion.Body className={bodyStyle}>
      {body}
    </Accordion.Body>
  </Accordion.Item>
);


export default AccordionItem;