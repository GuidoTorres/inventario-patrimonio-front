import { Flex, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
const { Search } = Input;
const Sedes = ({setTitle}) => {
  const [sedes, setSedes] = useState([]);

  useEffect(() => {
    setTitle("Sedes")
    getSedes()
  },[])

  const getSedes = async () => {
    const response = await fetch(`http://localhost:3006/api/v1/sedes`);

    if (response.ok) {
      const info = await response.json();
      setSedes(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      align: "center",
    },
  ];
  return (
    <>
      <Flex
        justify="space-between"
        className="inventario-container"
        gap={"10px"}
      >
        <Search
          placeholder="Buscar Bien"
          className="inventario-search"
        />

        <Button>Registrar Sede</Button>
      </Flex>

      <Table columns={columns} dataSource={sedes} />
    </>
  );
};

export default Sedes;
