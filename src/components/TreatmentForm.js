import { useState } from "react";
import { Form, Col, Row, Spinner } from "react-bootstrap";
import { setRows, updateRows } from "../util/general"


const TreatmentForm = ({
  isReadOnly = false,
  formData = {},
  handleSubmit,
}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    setLoading(true);
    await handleSubmit(event);
    setValidated(false);
    setLoading(false);
  };

  return (
    <Form className="mx-auto my-2" onSubmit={submitHandler} validated={validated}>
      {/*<Form.Group className="mb-3" controlId="consent">
          <Form.Check
            type="checkbox"
            label="Tietojani saa käyttää ja säilyttää hoidon toteuttamisen ja seurannan vuoksi asiakassuhteen ajan 
                   ELK Weterin asiakastietorekisterissä"
          />
        </Form.Group>*/}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="horseName">
          <Form.Label className="mb-1">Hevosen nimi <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            required
            defaultValue={formData.horseName}
            type="text"
            name="horseName"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="race">
          <Form.Label className="mb-1">Rotu <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            required
            defaultValue={formData.race}
            type="text"
            name="race"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="age">
          <Form.Label className="mb-1">Syntymävuosi <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            required
            defaultValue={formData.age}
            type="number"
            name="age"
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="sex">
          <Form.Label className="mb-1">Sukupuoli</Form.Label>
          {isReadOnly === false ? (
            <Form.Control as="select" defaultValue="O" name="sex">
              <option>O</option>
              <option>R</option>
              <option>T</option>
            </Form.Control>
          ) : (
            <Form.Control readOnly value={formData.sex} />
          )}
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="purpose">
          <Form.Label className="mb-1">Hevosen käyttötark.</Form.Label>
          {isReadOnly === false ? (
            <Form.Control as="select" defaultValue="Harraste" name="purpose">
              <option>Ravi</option>
              <option>Ratsu</option>
              <option>Harraste</option>
              <option>Työ</option>
            </Form.Control>
          ) : (
            <Form.Control readOnly value={formData.purpose} />
          )}
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md="4" className="mb-3" controlId="owner">
          <Form.Label className="mb-1">Omistajan nimi <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            required
            defaultValue={formData.owner}
            type="text"
            name="owner"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="contactInfo">
          <Form.Label className="mb-1">Yhteystiedot <span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            placeholder="Osoite, puhelinnumero"
            defaultValue={formData.contactInfo}
            required
            type="text"
            name="contactInfo"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="issues">
        <Form.Label className="mb-1">Ongelmat/Sairaudet/Tapaturmat</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.issues}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.issues)}
          name="issues"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="medications">
        <Form.Label className="mb-1">Lääkitykset</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.medications}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.medications)}
          name="medications"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exercise">
        <Form.Label className="mb-1">Viikoittainen liikunta</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.exercise}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.exercise)}
          name="exercise"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="feeding">
        <Form.Label className="mb-1">Ruokinta</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.feeding}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.feeding)}
          name="feeding"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="excrement">
        <Form.Label className="mb-1">Uloste</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.excrement}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.excrement)}
          name="excrement"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="drinking">
        <Form.Label className="mb-1">Juonti, janoisuus</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.drinking}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.drinking)}
          name="drinking"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="urination">
        <Form.Label className="mb-1">Virtsaus</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.urination}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.urination)}
          name="urination"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="worming">
        <Form.Label className="mb-1">Madotukset</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.worming}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.worming)}
          name="worming"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="dental">
        <Form.Label className="mb-1">Suu ja hampaat hoidettu</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.dental}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.dental)}
          name="dental"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="hoofs">
        <Form.Label className="mb-1">Kengitys/kaviot hoidettu</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.hoofs}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.hoofs)}
          name="hoofs"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="vaccination">
        <Form.Label className="mb-1">Rokotukset</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.vaccination}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.vaccination)}
          name="vaccination"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="appearance">
        <Form.Label className="mb-1">
          Miltä hevonen näyttää (rakenne, kehon sopusuhtaisuus, jalka-asennot yms.)
        </Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.appearance}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.appearance)}
          name="appearance"
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="fitness">
          <Form.Label className="mb-1">Lihavuuskunto</Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            defaultValue={formData.fitness}
            type="text"
            maxLength={1000}
            name="fitness"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="fur">
          <Form.Label className="mb-1">Karvan laatu</Form.Label>
          <Form.Control
            readOnly={isReadOnly}
            defaultValue={formData.fur}
            type="text"
            maxLength={1000}
            name="fur"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-4" controlId="temper">
        <Form.Label className="mb-1">Luonne</Form.Label>
        <Form.Control
          readOnly={isReadOnly}
          defaultValue={formData.temper}
          as="textarea"
          maxLength={1000}
          onChange={updateRows}
          rows={setRows(formData.temper)}
          name="temper"
        />
      </Form.Group>

      {isReadOnly === false && (
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn-custom wide" onClick={() => setValidated(true)}>
            {loading ? <Spinner animation="border" size="sm" /> : "Lähetä"}
          </button>
        </div>
      )}
    </Form>
  );
};

export default TreatmentForm;