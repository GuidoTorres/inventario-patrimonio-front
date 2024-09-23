import { Button, Flex, Form, Input, Select, notification } from "antd";
import React, { useEffect } from "react";
import "./styles/formularioBien.css";
import dayjs from "dayjs";

const FormularioBien = ({ data }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

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
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const data = await response.json();
      console.log('====================================');
      console.log(data);
      console.log('====================================');

      if (response.ok) {
        notification.success({
          message: 'Formulario enviado con éxito',
          description: `Datos guardados correctamente: ${JSON.stringify(data)}`,
        });
      } else {
        notification.error({
          message: 'Error al enviar el formulario',
          description: data.message || 'Error inesperado',
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
                  value: "Nuevo",
                  label: "Nuevo",
                },
                {
                  value: "Bueno",
                  label: "Bueno",
                },
                {
                  value: "Regular",
                  label: "Regular",
                },
                {
                  value: "Malo",
                  label: "Malo",
                },
                {
                  value: "RAEE",
                  label: "RAEE",
                },
                {
                  value: "Chatarra",
                  label: "Chatarra",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Situación"
            name="situación"
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
            label="Sede"
            name="sede"
            className="form-item"
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
            label="Ubicación"
            name="ubicacion"
            className="form-item"
            rules={[
              {
                required: true,
                message: "La ubicación es obligatoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Dependencia"
            name="dependencia"
            className="form-item"
            rules={[
              {
                required: true,
                message: "La dependencia es obligatoria!",
              },
            ]}
          >
            <Input />
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
            className="form-item"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Estado Patrimonial"
            name="estado_patrimonial"
            className="form-item"
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
