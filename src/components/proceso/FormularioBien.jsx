import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  message,
  notification,
  Image,
  Upload,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import "./styles/formularioBien.css";
import dayjs from "dayjs";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const FormularioBien = ({ data, setBienes, sbn, sobrante }) => {
  const [form] = Form.useForm();
  const [sedes, setSedes] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [filteredDependencias, setFilteredDependencias] = useState([]);
  const [filteredUbicaciones, setFilteredUbicaciones] = useState([]);
  const [isRequired, setIsRequired] = useState(true); // Estado para controlar la obligatoriedad
  const [userId, setUserId] = useState(null);

  const [formValues, setFormValues] = useState({
    sede_id: "",
    dependencia_id: "",
    ubicacion_id_id: "",
  });
  const [trabajador, setTrabajador] = useState("");
  const [file, setFile] = useState(null); // Estado para el archivo
  const [imageUrl, setImageUrl] = useState(null); // Estado para la URL de la imagen cargada
  const [loading, setLoading] = useState(false); // Estado para cargando

  const props = {
    name: "file",
    multiple: false,
    accept: "image/*", // Aceptar solo imágenes
    showUploadList: false, // Desactivar la lista de archivos predeterminada
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Solo se permiten archivos de imagen.");
        return Upload.LIST_IGNORE;
      }
      setFile(file); // Guardar el archivo
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); // Vista previa de la imagen
      };
      reader.readAsDataURL(file);

      return false; // Prevenir el comportamiento por defecto de la subida
    },
  };
  const validateSBN = () => {
    // Verificar si el 3er y 4to dígito son 6 y 4
    if (sbn.length >= 4 && sbn[2] === "6" && sbn[3] === "4") {
      setIsRequired(false); // Hacer los campos obligatorios
    } else {
      setIsRequired(true); // Los campos no son obligatorios
    }
  };

  useEffect(() => {
    validateSBN();
  }, [sbn]);

  // Función para eliminar la imagen cargada
  const handleRemoveImage = () => {
    setImageUrl(null); // Eliminar la vista previa de la imagen
    setFile(null); // Eliminar el archivo de imagen
  };
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      setFormValues((value) => ({
        ...value,
        sede_id: data?.sede_id,
      }));
      setFormValues((value) => ({
        ...value,
        dependencia_id: data?.dependencia_id,
      }));
      setFormValues((value) => ({
        ...value,
        ubicacion_id_id: data?.ubicacion_id,
      }));
      getTrabajadores(data?.dni);
      if (data?.imagen) {
        setImageUrl(data.imagen); // Establecer la imagen existente al cargar los datos
      }
    }
  }, [data]);

  useEffect(() => {
    getSedes();
    getUbicaciones();
    getDependencias();
  }, []);

  useEffect(() => {
    if (formValues.sede_id && dependencias.length > 0) {
      const filtered = dependencias.filter(
        (item) => item.sede_id === formValues.sede_id
      );
      setFilteredDependencias(filtered); // Actualiza las dependencias filtradas
    }

    if (formValues.dependencia_id && ubicaciones.length > 0) {
      const filtered = ubicaciones.filter(
        (item) => item.dependencia_id === formValues.dependencia_id
      );
      setFilteredUbicaciones(filtered); // Actualiza las ubicaciones filtradas
    }
  }, [
    formValues.sede_id,
    formValues.dependencia_id,
    dependencias,
    ubicaciones,
  ]);

  const getSedes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/sedes`);

    if (response.ok) {
      const info = await response.json();
      setSedes(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };
  const getDependencias = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/dependencias`);

    if (response.ok) {
      const info = await response.json();
      setDependencias(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getUbicaciones = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE}/ubicaciones`);

    if (response.ok) {
      const info = await response.json();
      setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
    }
  };

  const getTrabajadores = async (e) => {
    const length = e?.length;

    if (length === 8) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE}/trabajadores?dni=${e}`
      );

      const info = await response.json();
      if (response.ok) {
        setTrabajador(info); // Guardar los bienes en el estado si la respuesta es exitosa
      } else {
        notification.error({ message: info.msg });
      }
    }
  };

  const getData = () => {
    if (window.electron && window.electron.sendDataRequest) {
      window.electron.sendDataRequest(); // Solicitar los datos al proceso principal
      window.electron.onCompleteData((data) => {
        console.log("Datos recibidos:", data);
        setUserId(data?.id); // Asignar los datos recibidos al estado
      });
    } else {
      console.error("window.electron no está definido");
    }
  };

  useEffect(() => {
    getData(); // Solicitar los datos al montar el componente
  }, []);
  const onFinish = async (values) => {
    const formData = new FormData(); // Crear una nueva instancia de FormData
    // Agregar los campos del formulario a FormData
    formData.append("marca", values.marca || "");
    formData.append("modelo", values.modelo || "");
    formData.append("serie", values.serie || "");
    formData.append("color", values.color || "");
    formData.append("estado", values.estado || null);
    formData.append("situacion", values.situacion || false);
    formData.append("detalles", values.detalles || "");
    formData.append("sede_id", values.sede_id || null); // Usar null si no hay valor
    formData.append("dependencia_id", values.dependencia_id || null); // Usar null si no hay valor
    formData.append("ubicacion_id", values.ubicacion_id || null); // Usar null si no hay valor
    formData.append("dni", values.dni || "");
    formData.append("estado_patrimonial", values.estado_patrimonial || null);
    formData.append("inventariado", true);
    formData.append("fecha_registro", dayjs().format("DD/MM/YYYY"));
    formData.append("usuario_id", userId || null);
    formData.append("sbn", values.sbn || "");
    formData.append("tipo", sobrante ? "sobrante" : "activo");

    // Si hay una imagen seleccionada, añadirla a FormData
    if (file) {
      formData.append("imagen", file); // Nombre del campo 'imagen'
    }

    // Hacer un PUT con FormData
    const response = await fetch(`${process.env.REACT_APP_BASE}/bienes`, {
      method: "PUT",
      body: formData, // Enviar el FormData con los valores
    });

    const data = await response.json();

    if (response.ok) {
      notification.success({
        message: data.msg,
      });
      setBienes(null);
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
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <div className="form-container">
          <div
            style={{
              flex: "2",
              border: "1px solid rgb(228, 228, 228)",
              padding: "5px",
              borderRadius: "8px",
            }}
          >
            <Flex justify="start" align="center" horizontal="true" gap={"10px"}>
              <Form.Item
                label="Código"
                name="sbn"
                className="form-item-codigo"
                rules={[
                  {
                    required: sobrante ? true : false,
                    message: "El Código o SBN es obligatorio",
                  },
                ]}
              >
                <Input className="form-item-input" disabled />
              </Form.Item>

              <Form.Item
                label="Descripción"
                name="descripcion"
                style={{ width: "70%", marginTop: "4px" }}
                rules={[
                  {
                    required: sobrante ? true : false,
                    message: "La descripción es obligatoria!",
                  },
                ]}
              >
                <Input className="form-item-input" disabled />
              </Form.Item>
            </Flex>

            <Flex justify="start" align="center" horizontal gap={"10px"}>
              <Form.Item
                label="Marca"
                name="marca"
                className="form-item"
                rules={[
                  {
                    required: isRequired,
                    message: "La marca es obligatoria!",
                  },
                ]}
              >
                <Input allowClear disabled={data?.estado === "2"} />
              </Form.Item>

              <Form.Item
                label="Modelo"
                name="modelo"
                className="form-item"
                rules={[
                  {
                    required: isRequired,
                    message: "El modelo es obligatoria!",
                  },
                ]}
              >
                <Input allowClear disabled={data?.estado === "2"} />
              </Form.Item>

              <Form.Item
                label="Serie"
                name="serie"
                className="form-item"
                rules={[
                  {
                    required: data.estado === "2" ? false : isRequired,
                    message: "La serie es obligatoria!",
                  },
                ]}
              >
                <Input allowClear disabled={data?.estado === "2"} />
              </Form.Item>
            </Flex>

            <Flex justify="start" align="center" horizontal gap={"10px"}>
              <Form.Item
                label="Color"
                name="color"
                className="form-item"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "El color es obligatoria!",
                  },
                ]}
              >
                <Input allowClear disabled={data?.estado === "2"} />
              </Form.Item>
              <Form.Item
                label="Estado"
                name="estado"
                className="form-item"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "El estado es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
                  options={[
                    {
                      value: "1",
                      label: "Activo",
                    },
                    {
                      value: "2",
                      label: "Baja",
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
                    required: data.estado === "2" ? false : true,
                    message: "La situación es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  options={[
                    {
                      value: "1",
                      label: "Uso",
                    },
                    {
                      value: "2",
                      label: "Desuso",
                    },
                  ]}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
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
                    required: data.estado === "2" ? false : true,
                    message: "La sede es obligatoria!",
                  },
                ]}
              >
                <Input allowClear disabled={data?.estado === "2"} />
              </Form.Item>
              <Form.Item
                label="Sede"
                name="sede_id"
                className="form-item-large"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "La sede es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  options={sedes.map((item) => {
                    return {
                      label: item.nombre,
                      value: item.id,
                    };
                  })}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
                  onChange={(e) =>
                    setFormValues((value) => ({ ...value, sede_id: e }))
                  }
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
                    required: data.estado === "2" ? false : true,
                    message: "La dependencia es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  options={filteredDependencias.map((item) => {
                    return {
                      label: item.nombre,
                      value: item.id,
                    };
                  })}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
                  onChange={(e) =>
                    setFormValues((value) => ({ ...value, dependencia_id: e }))
                  }
                />
              </Form.Item>
              <Form.Item
                label="Ubicación"
                name="ubicacion_id"
                className="form-item-large"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "La ubicación es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  options={filteredUbicaciones.map((item) => {
                    return {
                      label: item.nombre,
                      value: item.id,
                    };
                  })}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
                  onChange={(e) =>
                    setFormValues((value) => ({ ...value, ubicacion_id: e }))
                  }
                />
              </Form.Item>
            </Flex>

            <Flex justify="start" align="center" horizontal gap={"10px"}>
              <Form.Item
                label="Dni"
                name="dni"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "El dni es obligatoria!",
                  },
                ]}
                className="form-item-codigo"
              >
                <Input
                  onChange={(e) => getTrabajadores(e.target.value)}
                  allowClear
                  disabled={data?.estado === "2"}
                />
              </Form.Item>

              <Form.Item label="Trabajador" className="form-item-x-large">
                <Input disabled value={trabajador?.nombre} allowClear />
              </Form.Item>
            </Flex>

            <Flex justify="start" align="center" horizontal gap={"10px"}>
              <Form.Item
                label="Estado Patrimonial"
                name="estado_patrimonial"
                className="form-item-large"
                rules={[
                  {
                    required: data.estado === "2" ? false : true,
                    message: "El estado patrimonial es obligatoria!",
                  },
                ]}
              >
                <Select
                  className="form-item-input"
                  options={[
                    {
                      value: 5,
                      label: "Nuevo",
                    },
                    {
                      value: 1,
                      label: "Bueno",
                    },
                    {
                      value: 2,
                      label: "Regular",
                    },
                    {
                      value: 3,
                      label: "Malo",
                    },
                    {
                      value: 7,
                      label: "RAEE",
                    },
                    {
                      value: 6,
                      label: "Chatarra",
                    },
                  ]}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  allowClear
                  disabled={data?.estado === "2"}
                />
              </Form.Item>
            </Flex>
          </div>
          <div
            style={{
              flex: "1",
              border: "1px solid rgb(228, 228, 228)",
              padding: "5px",
              borderRadius: "8px",
            }}
          >
            <Flex
              justify="start"
              align="center"
              horizontal
              gap={"10px"}
              style={{ height: "100%" }}
            >
              <Form.Item
                // label="Imagen"
                name="imagen"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Dragger
                  {...props}
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "20px",
                  }}
                  onRemove={handleRemoveImage}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="imagen"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Haz clic o arrastra la imagen aquí
                      </p>
                      <p className="ant-upload-hint">Una sola imagen.</p>
                    </>
                  )}
                </Dragger>
              </Form.Item>
            </Flex>
          </div>
        </div>
        <Form.Item>
          <Flex justify="end">
            <Button
              htmlType="submit"
              style={{
                backgroundColor: " #4DA362 ",
                color: "white",
                marginTop: "10px",
              }}
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
