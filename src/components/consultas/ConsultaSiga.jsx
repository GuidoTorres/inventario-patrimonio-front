import { Flex, Select, Button, Input, Table, Descriptions } from "antd";
import React, { useEffect, useState } from "react";

const ConsultaSiga = ({ setTitle }) => {
  const [sedes, setSedes] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [selectedSede, setSelectedSede] = useState(null);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [codigoSBN, setCodigoSBN] = useState("");
  const [serie, setSerie] = useState("");
  const [bienes, setBienes] = useState([]);
  
  useEffect(() => {
    setTitle("Consulta Siga");
    getSedes();
    getUbicaciones();
  }, []);

  const columns = [
    {
      title: "COD. SBN",
      dataIndex: "CODIGO_ACTIVO",
      align: "center",
    },
    {
      title: "DETALLES",
      dataIndex: "denominacion",
      align: "center",
    },
    {
      title: "MARCA",
      dataIndex: "MARCA",
      align: "center",
    },
    {
      title: "MODELO",
      dataIndex: "MODELO",
      align: "center",
    },
    {
      title: "COLOR",
      dataIndex: "COLOR",
      align: "center",
    },
    {
      title: "SERIE",
      dataIndex: "SERIE",
      align: "center",
    },
    {
      title: "SITUACIÓN",
      dataIndex: "SITUACIÓN",
      align: "center",
    },
  ];

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

  const realizarBusqueda = async () => {
    const queryParams = new URLSearchParams();
    if (selectedSede) queryParams.append("sede_id", selectedSede);
    if (selectedUbicacion)
      queryParams.append("ubicacion_id", selectedUbicacion);
    if (usuario) queryParams.append("dni", usuario);
    if (codigoSBN) queryParams.append("sbn", codigoSBN);
    if (serie) queryParams.append("serie", serie);

    const response = await fetch(
      `http://localhost:3001/api/v1/bienes?${queryParams.toString()}`
    );
    if (response.ok) {
      const data = await response.json();
      setBienes(data.data);
    }
  };
  const LimpiarBusqueda = async () => {
    setBienes([]);
    setSerie("");
    setCodigoSBN("");
    setUsuario("");
    setSelectedSede(null);
    setSelectedUbicacion(null);
  };

  const expandedRowRenderPrueba = (record) => {
    const items = [
      {
        key: '1',
        label: 'UserName',
        children: 'Zhou Maomao',
      },
      {
        key: '2',
        label: 'Telephone',
        children: '1810000000',
      },
      {
        key: '3',
        label: 'Live',
        children: 'Hangzhou, Zhejiang',
      },
      {
        key: '4',
        label: 'Remark',
        children: 'empty',
      },
      {
        key: '5',
        label: 'Address',
        children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
      },
    ];

    return (
      <Descriptions title="Información Adicional" items={items} />
    );
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid rgb(228, 228, 228)",
        }}
      >
        <Flex
          justify="flex-start"
          style={{
            padding: "15px",
            borderRadius: "10px",
            // boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          gap={"10px"}
        >
          <Select
            placeholder="Sedes"
            style={{
              width: "33%",
            }}
            value={selectedSede || undefined}
            options={sedes.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
            onChange={setSelectedSede}
          />
          <Select
            placeholder="Ubicaciones"
            value={selectedUbicacion || undefined}
            style={{
              width: "33%",
            }}
            options={ubicaciones.map((item) => {
              return {
                label: item.nombre,
                value: item.id,
              };
            })}
            onChange={setSelectedUbicacion}
          />
          <Input
            placeholder="Usuarios"
            style={{
              width: "33%",
            }}
            value={usuario || undefined}
            onChange={(e) => setUsuario(e.target.value)}
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
              onChange={(e) => setCodigoSBN(e.target.value)}
              value={codigoSBN || undefined}
            />
            <Input
              placeholder="Serie"
              style={{
                width: "50%",
              }}
              onChange={(e) => setSerie(e.target.value)}
              value={serie || undefined}
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
              onClick={realizarBusqueda}
            >
              {" "}
              Realizar Busqueda
            </Button>
            <Button
              style={{ backgroundColor: "#4DA362", color: "white" }}
              onClick={LimpiarBusqueda}
            >
              {" "}
              Limpiar Busqueda
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
          border: "1px solid rgb(228, 228, 228)",
        }}
      >
        <Table
          columns={columns}
          dataSource={bienes?.map((item, index) => ({
            ...item,
            key: item.id || index,
          }))}          className="custom-header-table"
          expandable={{
            expandedRowRender: (record) =>
              expandedRowRenderPrueba(record),
          }}
        />
      </section>
    </>
  );
};

export default ConsultaSiga;
