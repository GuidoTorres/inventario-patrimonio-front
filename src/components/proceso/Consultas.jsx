import React, { useEffect, useState } from "react";
import { Flex, Select, Button, Input, Table } from "antd";
const Consultas = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Consulta Bienes Inventariados");
    getBienes();
    getSedes();
    getUbicaciones();
  }, []);

  const [bienes, setBienes] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [filters, setFilters] = useState([]);

  const getBienes = async () => {
    const response = await fetch(
      `http://localhost:3006/api/v1/bienes/inventariados`
    );

    if (response.ok) {
      const info = await response.json();
      setBienes(info.bien); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getSedes = async () => {
    const response = await fetch(`http://localhost:3006/api/v1/sedes`);

    if (response.ok) {
      const info = await response.json();
      setSedes(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };
  const getUbicaciones = async () => {
    const response = await fetch(`http://localhost:3006/api/v1/ubicaciones`);

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const columns = [
    {
      title: "COD. SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      title: "DETALLES",
      dataIndex: "detalles",
      align: "center",
    },
    {
      title: "MARCA",
      dataIndex: "marca",
      align: "center",
    },
    {
      title: "MODELO",
      dataIndex: "modelo",
      align: "center",
    },
    {
      title: "COLOR",
      dataIndex: "color",
      align: "center",
    },
    {
      title: "SERIE",
      dataIndex: "serie",
      align: "center",
    },
    {
      title: "SITUACIÓN",
      dataIndex: "situacion",
      align: "center",
    },
  ];
  const handleInputChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Construir la URL con los filtros dinámicos
  const buildQueryParams = () => {
    const query = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query.append(key, filters[key]);
      }
    });

    return query.toString();
  };

  // Enviar la consulta a la API
  const handleSearch = async () => {
    const queryParams = buildQueryParams();
    const url = `http://localhost:3006/api/v1/bienes/consulta?${queryParams}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBienes(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <Flex
          justify="flex-start"
          style={{
            padding: "15px",
            borderRadius: "10px",
            boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          }}
          gap={"10px"}
        >
          <Select
            placeholder="Sedes"
            style={{
              width: "33%",
            }}
            name="sede_id"
            value={filters.sede_id}
            onChange={(e) => handleInputChange("sede_id", e)}
            options={sedes.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
          />
          <Select
            placeholder="Ubicaciones"
            style={{
              width: "33%",
            }}
            options={ubicaciones.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
            name="ubicacion_id"
            value={filters.ubicacion_id}
            onChange={(e) => handleInputChange("ubicacion_id", e)}
          />
          <Select
            placeholder="Usuarios"
            style={{
              width: "33%",
            }}
            options={ubicaciones.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
            name="dni"
            value={filters.dni}
            onChange={(e) => handleInputChange("dni", e)}
          />
        </Flex>
        <Flex justify="start" align="center">
          <Flex
            justify="start"
            style={{
              padding: "15px",
              borderRadius: "10px",
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
              width: "50%",
            }}
            gap={"10px"}
          >
            <Input
              placeholder="Código SBN"
              style={{
                width: "50%",
              }}
              name="sbn"
              value={filters.sbn}
              onChange={(e) => handleInputChange("sbn", e.target.value)}
            />
            <Input
              placeholder="Serie"
              style={{
                width: "50%",
              }}
              name="serie"
              value={filters.serie}
              onChange={(e) => handleInputChange("serie", e.target.value)}
            />
          </Flex>
          <Flex
            style={{
              width: "50%",
              padding: "15px",
            }}
            align="center"
            justify="end"
          >
            <Button
              style={{ backgroundColor: "#4DA362", color: "white" }}
              onClick={handleSearch}
            >
              {" "}
              Realizar Busqueda
            </Button>
          </Flex>
        </Flex>
      </div>
      <section
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "20px",
          padding: "15px",
        }}
      >
        <Table
          columns={columns}
          dataSource={bienes}
          className="custom-header-table"
        />
      </section>
    </>
  );
};

export default Consultas;
