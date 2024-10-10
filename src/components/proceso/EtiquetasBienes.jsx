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
  const [sedes, setSedes] = useState([]);
  const [data, setData] = useState([])
  const [dependencias, setDependencias] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedDependencia, setSelectedDependencia] = useState(null);

  useEffect(() => {
    getUbicaciones();
  }, []);

  useEffect(() => {
    setSedes(data.map(item => item.sede)); // Extraer las sedes del data
  }, [data]);

  const getUbicaciones = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/ubicaciones`);

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getTrabajador = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE}/trabajadores/all`
    );

    if (response.ok) {
      const info = await response.json();
      setTrabajadores(info); // Guardar los bienes en el estado si la respuesta es exitosa
    } else {
      setTrabajadores([]);
    }
  };

  // Función para manejar el cambio de trabajador
  const handleTrabajadorChange = async () => {
    // Hacer una solicitud para obtener las sedes, dependencias y ubicaciones según el trabajador seleccionado
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE}/bienes/trabajadores/sedes?dni=${dni}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error al obtener datos relacionados:", error);
    }
  };

  const handleSedeChange = (sedeId) => {
    setSelectedSede(sedeId);

    // Filtrar dependencias por la sede seleccionada
    const filteredDependencias = data
      .filter((item) => item.sede.id === sedeId)
      .map((item) => item.dependencia);

    setDependencias(filteredDependencias);
    setUbicaciones([]); // Limpiar ubicaciones al cambiar de sede
    setSelectedDependencia(null); // Limpiar selección de dependencia
  };

  const handleDependenciaChange = (dependenciaId) => {
    setSelectedDependencia(dependenciaId);

    // Filtrar ubicaciones por la dependencia seleccionada
    const filteredUbicaciones = sedes
      .filter((item) => item.dependencia.id === dependenciaId)
      .map((item) => item.ubicacione);

    setUbicaciones(filteredUbicaciones);
  };

  useEffect(() => {
    if (dni?.length === 8) {
      handleTrabajadorChange();
    }
  }, [dni]);

  const getEtiquetas = async () => {
    let url = `${process.env.REACT_APP_BASE}/bienes/etiquetas?`; // URL base

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

  // useEffect(() => {
  //   getEtiquetas();
  // }, [dni]);

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
  console.log(sedes);
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
          border: "1px solid lightgrey",
        }}
      >
        <Select
          placeholder="Trabajador"
          className="form-item-input"
          onChange={(e) => setDni(e)}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          options={trabajadores?.map((item) => {
            return { label: item.nombre, value: item.dni };
          })}
        />
        <Select
          placeholder="Sedes"
          className="form-item-input"
          onChange={handleSedeChange}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          options={sedes?.map((item) => {
            return {
              value: item?.sede?.id,
              label: item?.sede?.nombre,
            };
          })}
        />
        <Select
          placeholder="Dependencias"
          className="form-item-input"
          onChange={handleDependenciaChange}
          value={selectedDependencia}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          options={sedes?.map((item) => {
            return {
              value:
                item?.dependencia?.tipo_ubicac +
                "" +
                item?.dependencia?.ubicac_fisica,
              label: item?.dependencia?.nombre,
            };
          })}
        />

        <Select
          placeholder="Ubicaciones"
          className="form-item-input"
          onChange={(e) => setCod(e)}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          allowClear
          options={sedes?.map((item) => {
            return {
              value:
                item?.ubicacione?.tipo_ubicac +
                "" +
                item?.ubicacione?.ubicac_fisica,
              label: item?.ubicacione?.nombre,
            };
          })}
        />

        {/* <Input
          placeholder="SBN"
          onChange={(e) => setSbn(e.target.value)}
          allowClear

        /> */}
        <Button
          style={{ backgroundColor: "#4DA362", color: "white" }}
          onClick={() => handleBarcodePrint()}
        >
          Limpiar Filtros
        </Button>
        {etiquetas.length > 0 ? (
          <Flex justify="end" align="center">
            <Button
              style={{ backgroundColor: "#4DA362", color: "white" }}
              onClick={() => handleBarcodePrint()}
            >
              Imprimir Etiquetas
            </Button>
          </Flex>
        ) : null}
      </Flex>
      <div
        style={{
          height: "90%",
          border: "1px solid lightgrey",
          marginTop: "10px",
          borderRadius: "8px",
          padding: "1px",
          backgroundColor: "white",
        }}
      >
        <div ref={barcodeRef}>
          <CodigoBarras values={etiquetas} className="etiqueta" />
        </div>
      </div>
    </>
  );
};

export default EtiquetasBienes;
