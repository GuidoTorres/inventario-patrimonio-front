import { Flex, Input, Image, Empty, message, Tag } from "antd";
import React, { useEffect, useState } from "react";
import FormularioBien from "./FormularioBien";
import "./styles/inventario.css";

const { Search } = Input;
const Inventario = ({ setTitle }) => {
  const [bienes, setBienes] = useState(null);
  const [buscar, setBuscar] = useState("");
  const [isSobrante, setIsSobrante] = useState(false);

  useEffect(() => {
    setTitle("Registro de Bienes");
  }, []);

  useEffect(() => {
    if (buscar !== "") {
      getBienes();
    } else {
      limpiarData();
    }
  }, [buscar]);

  const getBienes = async () => {
    if (buscar !== "" && buscar.length === 12) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE}/bienes/inventario?sbn=${buscar}`
      );

      const info = await response.json(); // Asegúrate de obtener la data

      if (response.ok) {
        // Si no hay bienes en la respuesta, entonces es sobrante
        if (!info.info) {
          setIsSobrante(true);
          setBienes(null);
        } else {
          setIsSobrante(false);
          setBienes(info.info); // Guardar los bienes en el estado si se encuentran
        }
      } else {
        // Manejo de otros errores, como el 404 o el 403
        if (response.status === 403) {
          message.warning("El bien ya ha sido inventariado.");
        } else if (response.status === 404) {
          // Aquí lo tratamos como un sobrante
          setIsSobrante(true);
          setBienes(null);
          message.warning("El bien no fue encontrado, es un sobrante.");
        } else {
          setIsSobrante(false);
          message.error("Hubo un error al buscar el bien.");
        }
      }
    }
  };
  const limpiarData = async () => {
    setBienes(null);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setBuscar(newValue);
  };

  return (
    <>
      <Flex
        justify="space-between"
        className="inventario-container"
        gap={"10px"}
      >
        <Flex gap={"5px"}>
          <Search
            placeholder="Buscar Bien"
            className="inventario-search"
            onChange={handleInputChange}
            allowClear
          />
          {isSobrante ? (
            <Tag
              style={{
                fontSize: "15px",
                padding: "5px",
                height: "auto",
              }}
              color="gold"
            >
              Sobrante
            </Tag>
          ) : bienes?.estado === "1" ? (
            <Tag
              style={{
                fontSize: "18px",
                padding: "5px",
                height: "auto",
              }}
              color="green"
            >
              Activo
            </Tag>
          ) : bienes?.estado === "2" ? (
            <Tag
              style={{
                fontSize: "18px",
                padding: "5px",
                height: "auto",
              }}
              color="volcano"
            >
              Baja
            </Tag>
          ) : null}
        </Flex>

        <Input
          placeholder="Ingrese Locación"
          style={{ width: "400px" }}
          onChange={handleInputChange}
          allowClear
        />
      </Flex>

      <Flex justify="flex-start" className="inventario-content" gap={"10px"}>
        {bienes === null || isSobrante ? (
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "white" }}
          >
            {isSobrante ? (
              <FormularioBien
                data={{}}
                setBienes={setBienes}
                sbn={buscar}
                sobrante={isSobrante}
              /> // Mostrar el formulario vacío
            ) : (
              null
            )}
          </div>
        ) : (
          <>
            <FormularioBien
              data={bienes}
              setBienes={setBienes}
              sbn={buscar}
              sobrante={isSobrante}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default Inventario;
