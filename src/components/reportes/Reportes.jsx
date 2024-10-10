import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Row, Col, Card, Statistic, Tabs } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const socket = io("http://localhost:3006"); // Conectar a Socket.IO

const Reportes = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Reportes");
  }, []);
  const [bienes, setBienes] = useState([]); // Estado para almacenar el número de bienes inventariados
  const [actualizacion, setActualizacion] = useState(null); // Estado para mostrar las actualizaciones en tiempo real

  useEffect(() => {
    // Solicitar los bienes inventariados al montar el componente
    fetch(`${process.env.REACT_APP_BASE}/bienes/inventariador`)
      .then((response) => response.json())
      .then((data) => {
        setBienes(data.data); // Inicializar con el número de bienes inventariados
      })
      .catch((error) => console.error("Error fetching bienes:", error));

    // Escuchar cuando un bien ha sido registrado o actualizado
    socket.on("bien-actualizado", (data) => {
      console.log("Bien actualizado:", data);

      // Actualizar el contador con el valor más reciente del backend
      const updatedBienes = bienes.map((item) => {
        if (item.usuario?.id === data.bien.usuario_id) {
          return { ...item, total_bienes: item.total_bienes + 1 }; // Incrementar el conteo del inventariador
        }
        return item;
      });

      setBienes(updatedBienes); // Actualizar la lista de bienes con el nuevo conteo
      setActualizacion(data.bien); // Mostrar la última actualización
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []); // Asegúrate de que `bienes` esté en la lista de dependencias

  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Inventariadores",
      children: (
        <Row gutter={16}>
          {bienes?.map((item) => (
            <Col span={12} key={item?.usuario?.id}>
              <Card bordered={false}>
                <Statistic
                  title={`Bienes Inventariados por - ${item?.usuario?.nombre_usuario}`}
                  value={item?.total_bienes}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Reportes;
