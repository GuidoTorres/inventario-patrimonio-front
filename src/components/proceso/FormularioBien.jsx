import { Button, Flex, Form, Input, Select, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import "./styles/formularioBien.css";
import dayjs from "dayjs";

const FormularioBien = ({ data, setBienes }) => {
  const [form] = Form.useForm();
  const [sedes, setSedes] = useState([])
  const [dependencias, setDependencias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [filteredDependencias, setFilteredDependencias] = useState([]);
  const [filteredUbicaciones, setFilteredUbicaciones] = useState([]);
  const [formValues, setFormValues] = useState({ sede_id: '', dependencia_id: '', ubicacion_id_id: '' })
  const [trabajador, setTrabajador] = useState("")
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  useEffect(() => {
    getSedes()
    getUbicaciones()
    getDependencias()
  }, [])


  useEffect(() => {
    if (formValues.sede_id && dependencias.length > 0) {
      const filtered = dependencias.filter(item => item.sede_id === formValues.sede_id);
      setFilteredDependencias(filtered); // Actualiza las dependencias filtradas
    }

    if (formValues.dependencia_id && ubicaciones.length > 0) {
      const filtered = ubicaciones.filter(item => item.dependencia_id === formValues.dependencia_id);
      setFilteredUbicaciones(filtered); // Actualiza las ubicaciones filtradas
    }
  }, [formValues.sede_id, formValues.dependencia_id, dependencias, ubicaciones]);



  const getSedes = async () => {

    const response = await fetch(
      `http://localhost:3006/api/v1/sedes`
    );

    if (response.ok) {
      const info = await response.json();
      setSedes(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }

  }
  const getDependencias = async () => {

    const response = await fetch(
      `http://localhost:3006/api/v1/dependencias`
    );

    if (response.ok) {
      const info = await response.json();
      setDependencias(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }

  }

  const getUbicaciones = async () => {

    const response = await fetch(
      `http://localhost:3006/api/v1/ubicaciones`
    );

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }

  }

  const getTrabajadores = async (e) => {

    const value = e.target.value
    const length = value.length

    if (length === 8) {

      const response = await fetch(
        `http://localhost:3006/api/v1/trabajadores?dni=${e.target.value}`
      );

      const info = await response.json();
      if (response.ok) {
        setTrabajador(info); // Guardar los bienes en el estado si la respuesta es exitosa
      } else {
        notification.error({ message: info.msg })
      }
    }

  }

  const onFinish = async (values) => {
    const formatValues = {
      ...values,
      inventariado: true,
      fecha_registro: dayjs().format("DD/MM/YYYY"),
    };
    // Hacer un POST con los datos del formulario
    const response = await fetch('http://localhost:3006/api/v1/bienes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatValues), // Enviar los valores del formulario
    });
    const data = await response.json();

    if (response.ok) {
      notification.success({
        message: data.msg,
      });
      setBienes(null)
    } else {
      notification.error({
        message: data.msg,
      });
    }

  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        className="form-container"
        onFinish={onFinish}
      >
        <Flex justify="start" align="center" horizontal="true" gap={"10px"}>
          <Form.Item
            label="Código"
            name="sbn"
            className="form-item-codigo"
            rules={[
              {
                required: true,
                message: "El Código o SBN es obligatorio",
              },
            ]}
          >
            <Input className="form-item-input" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            style={{ width: "70%" }}
            rules={[
              {
                required: true,
                message: "La descripción es obligatoria!",
              },
            ]}
          >
            <Input className="form-item-input" />
          </Form.Item>
        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>
          <Form.Item
            label="Marca"
            name="marca"
            className="form-item"
            rules={[
              {
                required: true,
                message: "La marca es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Modelo"
            name="modelo"
            className="form-item"
            rules={[
              {
                required: true,
                message: "El modelo es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Serie"
            name="serie"
            className="form-item"
            rules={[
              {
                required: true,
                message: "La serie es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>
          <Form.Item
            label="Color"
            name="color"
            className="form-item"
            rules={[
              {
                required: true,
                message: "El color es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Estado"
            name="estado"
            className="form-item"
            rules={[
              {
                required: true,
                message: "El estado es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={[
                {
                  value: "5",
                  label: "Nuevo",
                },
                {
                  value: "1",
                  label: "Bueno",
                },
                {
                  value: "2",
                  label: "Regular",
                },
                {
                  value: "3",
                  label: "Malo",
                },
                {
                  value: "7",
                  label: "RAEE",
                },
                {
                  value: "6",
                  label: "Chatarra",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Situación"
            name="situacion"
            className="form-item"
            rules={[
              {
                required: true,
                message: "La situación es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={[
                {
                  value: true,
                  label: "Uso",
                },
                {
                  value: false,
                  label: "Desuso",
                },
              ]}
            />
          </Form.Item>
        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>
          <Form.Item
            label="Detalles"
            name="detalles"
            className="form-item-large"
            rules={[
              {
                required: true,
                message: "La sede es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sede"
            name="sede_id"
            className="form-item-large"

            rules={[
              {
                required: true,
                message: "La sede es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={sedes.map(item => {
                return {
                  label: item.nombre,
                  value: item.id
                }
              })}
              onChange={(e) => setFormValues(value => ({ ...value, sede_id: e }))}
            />
          </Form.Item>


        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>
          <Form.Item
            label="Dependencia"
            name="dependencia_id"
            className="form-item-large"
            rules={[
              {
                required: true,
                message: "La dependencia es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={filteredDependencias.map(item => {
                return {
                  label: item.nombre,
                  value: item.id
                }
              })}
              onChange={(e) => setFormValues(value => ({ ...value, dependencia_id: e }))}

            />
          </Form.Item>
          <Form.Item
            label="Ubicación"
            name="ubicacion_id"
            className="form-item-large"
            rules={[
              {
                required: true,
                message: "La ubicación es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={filteredUbicaciones.map(item => {
                return {
                  label: item.nombre,
                  value: item.id
                }
              })}
              onChange={(e) => setFormValues(value => ({ ...value, ubicacion_id: e }))}

            />
          </Form.Item>

        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>

          <Form.Item
            label="Dni"
            name="dni"
            rules={[
              {
                required: true,
                message: "El dni es obligatoria!",
              },
            ]}
            className="form-item-codigo"
          >
            <Input onChange={(e) => getTrabajadores(e)} />
          </Form.Item>

          <Form.Item
            label="Trabajador"
            className="form-item-x-large"

          >
            <Input disabled value={trabajador?.nombre}
            />
          </Form.Item>
        </Flex>

        <Flex justify="start" align="center" horizontal gap={"10px"}>
          <Form.Item
            label="Estado Patrimonial"
            name="estado_patrimonial"
            className="form-item-large"
            rules={[
              {
                required: true,
                message: "El estado patrimonial es obligatoria!",
              },
            ]}
          >
            <Select
              className="form-item-input"
              options={[
                {
                  value: true,
                  label: "Activo",
                },
                {
                  value: false,
                  label: "Baja",
                },
              ]}
            />
          </Form.Item>
        </Flex>

        <Form.Item>
          <Flex justify="end">
            <Button
              htmlType="submit"
              style={{ backgroundColor: " #4DA362 ", color: "white" }}
            >
              Guardar
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormularioBien;
