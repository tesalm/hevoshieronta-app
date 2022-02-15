import { useRef, useLayoutEffect, useState } from "react";
import ImageMapper from "react-img-mapper";
import { loadAreas } from "./map-area-data";
import horse from "./horse-superficial-muscles.png";
import classes from "./Mapper.module.css";
import { Accordion, Button, Form, Row, Col } from "react-bootstrap";
import AccordionItem from "../AccordionItem";
import { setRows } from "../../util/general";
import { massagesSchema } from "../../store/types";


const Mapper = ({treatments=massagesSchema, isReadOnly=true, setAreas}) => {
  const parentRef = useRef(null);
  const [width, setWidth] = useState();
  const [mirrored, setMirror] = useState(false);
  const [prevArea, setPrevArea] = useState(null);
  const [map, setMap] = useState({name: "mapper", areas: loadAreas(treatments)});
  const [areaDescription, setAreaDescription] = useState({
    title: "",
    name: "",
    description: "",
    treatment: null
  });

  useLayoutEffect(() => {
    function updateSize() {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  const areaClickHandler = (area, index) => {
    const newData = map.areas.map((el) =>
      el.id === area.id ? { ...el, preFillColor: "#EAB54D4D" } : 
      el.id === prevArea && !el.treatment ? { ...el, preFillColor: null } : 
      el.id === prevArea && el.treatment ? {...el, preFillColor:"#ff000050"} : el
    );

    setPrevArea(area.id);
    setMap({ ...map, areas: newData });
    setAreaDescription({
      title: area.title,
      name: "(" + area.name + ")",
      description: area.description,
      treatment: area.treatment
    });
  };

  function setTreatmentDescription(e) {
    let newAreaData = map.areas;
    const index = newAreaData.findIndex(el => el.id === prevArea);
    newAreaData[index] = {...newAreaData[index], treatment: e.target.value};
    const data = newAreaData
      .filter(a => a.treatment)
      .map(a => ({id:a.id, title:a.title, desc:a.treatment}));
    const dbData = mirrored? {...treatments, "leftFlank":data} : {...treatments, "rightFlank":data};

    setMap({...map, areas: newAreaData});
    setAreas(dbData);
    setAreaDescription({...areaDescription, treatment: e.target.value});
  };

  const turnFlankHandler = () => {
    setMirror(!mirrored);
    const flank = !mirrored === true ? "leftFlank" : "rightFlank";
    const areas = loadAreas(treatments, flank);
    setMap({...map, areas: areas});
  };

  return (
    <div ref={parentRef} className={classes.mapper}>
      <div className={mirrored ? classes.mirrored : ""}>
        <ImageMapper
          src={horse}
          map={map}
          natural={true}
          responsive={true}
          parentWidth={width}
          onClick={areaClickHandler}
        />
      </div>

      <Row className="pt-2">
        <Col className="me-auto pe-0" md={9} xs={8} sm={8}>
        {!areaDescription.description ? (
          <p className="text-secondary nowrap">
            Klikkaa lihasaluetta saadaksesi lisätietoa.
          </p>
        ) : (
          <div >
            <h3>{areaDescription.title}</h3>
            <p className={classes.name}>{areaDescription.name}</p>
          </div>
        )}
        </Col>
        <Col className="text-center" xs="auto" sm="auto">
          <Button onClick={turnFlankHandler} variant="dark" className="py-1 shadow-none">
            Käännä
          </Button>
          <p className="text-end fst-italic fw-bold mt-1 mb-0">{mirrored? "Vasen": "Oikea"} kylki</p>
        </Col>
      </Row>

      <div className={classes.description}>
        {areaDescription.description && (
          <Accordion>
            <AccordionItem
              header="Lihaksen perustiedot"
              body={areaDescription.description}
            />
            {areaDescription.treatment && isReadOnly ? (
              <AccordionItem
                ekey="1"
                header="Hoitotiedot"
                body={areaDescription.treatment}
              />
            ) : (
              isReadOnly === false && (
                <AccordionItem
                  ekey="1"
                  header="Hoitotiedot"
                  bodyStyle="p-2"
                  body={
                    <Form.Control
                      value={
                        areaDescription.treatment
                          ? areaDescription.treatment
                          : ""
                      }
                      onChange={setTreatmentDescription}
                      as="textarea"
                      rows={setRows(areaDescription.treatment)}
                    />
                  }
                />
              )
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
}

export default Mapper;