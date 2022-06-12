import { useRef, useLayoutEffect, useState } from "react";
import ImageMapper from "react-img-mapper";
import { loadAreas } from "./map-area-data";
import horse from "./horse-superficial-muscles.png";
import styles from "../../styles/Mapper.module.css";
import { Accordion, Button, Form, Spinner } from "react-bootstrap";
import AccordionItem from "../AccordionItem";
import { setRows } from "../../util/general";
import { massagesSchema } from "../../store/types";


const Mapper = ({treatments=massagesSchema, isReadOnly=true, setAreas}) => {
  const parentRef = useRef(null);
  const [width, setWidth] = useState();
  const [mirrored, setMirror] = useState(false);
  const [prevArea, setPrevArea] = useState(null);
  const [loading, setLoading] = useState(true);
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
    const dbData = mirrored? {...treatments, "rightFlank":data} : {...treatments, "leftFlank":data};

    setMap({...map, areas: newAreaData});
    setAreas(dbData);
    setAreaDescription({...areaDescription, treatment: e.target.value});
  };

  const turnFlankHandler = () => {
    setMirror(!mirrored);
    const flank = !mirrored === true ? "rightFlank" : "leftFlank";
    const areas = loadAreas(treatments, flank);
    setMap({...map, areas: areas});
  };

  const LoadingSpinner = () => (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Spinner animation="border" size="lg" variant="primary" />
    </div>
  );

  return (
    <div ref={parentRef} className={styles.mapper}>
      <div className={`${styles.canvas} ${mirrored && styles.mirrored}`}>
        {loading && <LoadingSpinner />}
        <ImageMapper
          src={horse}
          map={map}
          natural={true}
          responsive={true}
          parentWidth={width}
          onClick={areaClickHandler}
          onLoad={() => setLoading(false)}
        />
      </div>

      <div className="d-flex align-items-center pt-2">
        {!areaDescription.description ? (
          <p className="text-secondary nowrap flex-grow-1">
            Klikkaa lihasaluetta saadaksesi lisätietoa.
          </p>
        ) : (
          <div className="nowrap flex-grow-1">
            <h5 className={styles.title}>{areaDescription.title}</h5>
            <p className={styles.name}>{areaDescription.name}</p>
          </div>
        )}
        <div className="ps-2 d-flex flex-column justify-content-end">
          <Button onClick={turnFlankHandler} variant="dark" className="py-1">
            Käännä
          </Button>
          <p className={styles.flankStateTxt}>{mirrored? "Oikea": "Vasen"} kylki</p>
        </div>
      </div>

      <div className={styles.description}>
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