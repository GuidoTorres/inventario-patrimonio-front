import React, { useEffect } from "react";
import { Flex, Select, Button, Input, Table } from "antd";
const Consultas = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Consultas");
  }, []);

  const columns = [
    {
      title: "COD. SBN",
      dataIndex: "sbn",
      align: "center",
    },
    {
      title: "DENOMINACIÓN",
      dataIndex: "denominacion",
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
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
          <Select
            placeholder="Ubicaciones"
            style={{
              width: "33%",
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
          <Input
            placeholder="Usuarios"
            style={{
              width: "33%",
            }}
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
            />
            <Input
              placeholder="Serie"
              style={{
                width: "50%",
              }}
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
            <Button style={{backgroundColor:"#4DA362", color:"white"}}> Realizar Busqueda</Button>
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
        <Table columns={columns} />
      </section>
    </>
  );
};

export default Consultas;
