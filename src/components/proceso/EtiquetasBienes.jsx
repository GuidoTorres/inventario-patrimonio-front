import { Button, Flex, Input, Select, Typography } from "antd";
import Item from "antd/es/list/Item";
import React, { useEffect, useRef, useState } from "react";
import CodigoBarras from "./Etiquetas/CodigoBarras";
import { useReactToPrint } from "react-to-print";

const EtiquetasBienes = ({ setTitle }) => {
  const barcodeRef = useRef();

  useEffect(() => {
    setTitle("Etiquetas para bienes");
  }, []);
  const [printTrigger, setPrintTrigger] = useState(false);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [formValues, setFormValues] = useState();
  const [trabajadores, setTrabajadores] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [cod, setCod] = useState("");
  const [dni, setDni] = useState("");
  const [sbn, setSbn] = useState("");

  useEffect(() => {
    getUbicaciones();
  }, []);

  const getUbicaciones = async () => {
    const response = await fetch(`http://localhost:3006/api/v1/ubicaciones`);

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getTrabajador = async () => {
    const response = await fetch(
      `http://localhost:3006/api/v1/bienes/trabajadores?cod=${cod}`
    );

    if (response.ok) {
      const info = await response.json();
      setTrabajadores(info); // Guardar los bienes en el estado si la respuesta es exitosa
    } else {
      setTrabajadores([]);
    }
  };

  const getEtiquetas = async () => {
    let url = `http://localhost:3006/api/v1/bienes/etiquetas?`; // URL base

    // Agregar parámetros opcionales a la URL
    if (cod) {
      url += `cod=${cod}&`;
    }
    if (dni) {
      url += `dni=${dni}&`;
    }
    if (sbn) {
      url += `sbn=${sbn}&`;
    }

    // Eliminar el último `&` si existe
    url = url.slice(0, -1);

    const response = await fetch(url);

    if (response.ok) {
      const info = await response.json();
      setEtiquetas(info); // Guardar los bienes en el estado si la respuesta es exitosa
    } else {
      setEtiquetas([]);
    }
  };


  useEffect(() => {
    getEtiquetas();
  }, [dni, sbn]);

  useEffect(() => {
    getTrabajador();
  }, [cod]);
  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current,
  });

  const handleBarcodePrint = () => {
    setPrintTrigger(true);
  };

  useEffect(() => {
    if (printTrigger) {
      handlePrint();
      setPrintTrigger(false);
    }
  }, [printTrigger]);

  return (
    <>
      <style>
        {`
      @media print {
        @page {
          size: 5cm 2.4cm; /* Tamaño de la etiqueta */
          margin: 0; /* Sin márgenes en la página */
        }

        div {
          page-break-inside: avoid; /* Evitar que una etiqueta se corte entre páginas */
          break-inside: avoid-column;
        }

        /* Asegurarse de que las etiquetas ocupen el tamaño adecuado */
        .etiqueta {
          width: 5cm;
          height: 2.5cm;
          padding: 5px;
          box-sizing: border-box; /* Asegura que padding esté incluido en el tamaño total */
        }
      }
    `}
      </style>
      <Flex
        justify="start"
        gap={"10px"}
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid lightgrey"
        }}
      >
        <Input
          placeholder="Cod. Ubicación"
          onChange={(e) => setCod(e.target.value)}
        />
        <Select
          placeholder="Trabajador"
          className="form-item-input"
          onChange={(e) => setDni(e)}
          options={
            trabajadores.length > 0
              ? trabajadores.map((item) => {
                return { label: item.nombre, value: item.dni };
              })
              : []
          }

        />

        <Input
          placeholder="SBN"
          onChange={(e) => setSbn(e.target.value)}

        />
        <Button style={{ backgroundColor: "#4DA362", color: "white" }} onClick={() => handleBarcodePrint()}>Limpiar Filtros</Button>
        {etiquetas.length > 0 ?


          <Flex justify='end' align='center'>

            <Button style={{ backgroundColor: "#4DA362", color: "white" }} onClick={() => handleBarcodePrint()}>Imprimir Etiquetas</Button>
          </Flex>
          : null
        }
      </Flex>
      <div style={{
        height: "90%", border: "1px solid lightgrey"
        , marginTop: "10px", borderRadius: "8px", padding: "1px", backgroundColor: "white"
      }}>

        <div ref={barcodeRef}>
          <CodigoBarras values={etiquetas} className="etiqueta" />
        </div>

      </div>


    </>
  );
};

export default EtiquetasBienes;
