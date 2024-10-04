import { Button, Flex, Input, Select, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { pdf } from '@react-pdf/renderer';

import CargoPDF from './Pdfs/CargoPDF';
const TarjetasCargo = ({ setTitle }) => {
    const barcodeRef = useRef();

    useEffect(() => {
        setTitle("Tarjetas de Cargo")

    }, [])
    const [printTrigger, setPrintTrigger] = useState(false);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [formValues, setFormValues] = useState();
    const [trabajadores, setTrabajadores] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);
    const [cod, setCod] = useState("");
    const [dni, setDni] = useState("");
    const [sbn, setSbn] = useState("");

    useEffect(() => {
        getUbicaciones();
    }, []);

    const getUbicaciones = async () => {
        const response = await fetch(`http://localhost:3006/api/v1/ubicaciones`);

        if (response.ok) {
            const info = await response.json();
            setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
        }
    };

    console.log(ubicaciones);


    const getTrabajador = async () => {
        const response = await fetch(
            `http://localhost:3006/api/v1/bienes/trabajadores?cod=${cod}`
        );

        if (response.ok) {
            const info = await response.json();
            setTrabajadores(info); // Guardar los bienes en el estado si la respuesta es exitosa
        } else {
            setTrabajadores([]);
        }
    };

    const getEtiquetas = async () => {
        let url = `http://localhost:3006/api/v1/bienes/etiquetas?`; // URL base

        // Agregar parámetros opcionales a la URL
        if (cod) {
            url += `cod=${cod}&`;
        }
        if (dni) {
            url += `dni=${dni}&`;
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

    useEffect(() => {
        getEtiquetas();
    }, [dni]);

    useEffect(() => {
        getTrabajador();
    }, [cod]);
    const handlePrint = async () => {
        // Generar el PDF como un blob usando el componente CargoPDF
        const blob = await pdf(<CargoPDF registros={etiquetas} />).toBlob();

        // Crear una URL temporal para el blob
        const url = URL.createObjectURL(blob);

        // Abrir una nueva ventana para mostrar el PDF
        window.open(url);


    };
    return (
        <>
            <Flex justify="start" gap={"10px"} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px" }}>


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
                    options={
                        ubicaciones.map(item => {
                            return {
                                value: item.tipo_ubicac + "" + item.ubicac_fisica,
                                label: item.nombre
                            }

                        })
                    }

                />
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
                    options={
                        trabajadores.length > 0
                            ? trabajadores.map((item) => {
                                return { label: item.nombre, value: item.dni };
                            })
                            : []
                    }

                />
                <Button style={{ backgroundColor: "#4DA362", color: "white" }} >Limpiar Filtros</Button>
                {etiquetas.length > 0 ?


                    <Flex justify='end' align='center'>

                        <Button style={{ backgroundColor: "#4DA362", color: "white" }} onClick={handlePrint}>Imprimir</Button>
                    </Flex>
                    : null
                }
            </Flex>

        </>
    )
}

export default TarjetasCargo