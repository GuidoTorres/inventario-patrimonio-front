import { Flex, Input, Select, Button } from 'antd';
import React, { useEffect, useState, useRef } from 'react'
import QRCode from "react-qr-code";
import image from "../../assets/logo_autodema.png";
import image1 from "../../assets/gobierno.png";
import { useReactToPrint } from "react-to-print";
import { noop } from 'antd/es/_util/warning';
const EtiquetasUbicaciones = () => {
    const barcodeRef = useRef();

    const [sedes, setSedes] = useState([])
    const [dependencias, setDependencias] = useState([])
    const [ubicaciones, setUbicaciones] = useState([])
    const [formValues, setFormValues] = useState({ sede: '', dependencia: '', ubicaciones })
    const [filteredDependencias, setFilteredDependencias] = useState([]);
    const [filteredUbicaciones, setFilteredUbicaciones] = useState([]);
    const [printTrigger, setPrintTrigger] = useState(false);

    const [dataValues, setDataValues] = useState({ sede: '', dependencia: '', ubicaciones })


    useEffect(() => {

        getSedes()
        getDependencias()
        getUbicaciones()
    }, [])

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

    useEffect(() => {
        if (formValues.sede && dependencias?.length > 0) {
            const filtered = dependencias.filter(item => item.sede_id === formValues.sede);
            setFilteredDependencias(filtered); // Actualiza las dependencias filtradas
        }

        if (formValues.dependencia && ubicaciones?.length > 0) {
            const filtered = ubicaciones.filter(item => item.dependencia_id === formValues.dependencia);
            setFilteredUbicaciones(filtered); // Actualiza las ubicaciones filtradas
        }

    }, [formValues.sede, formValues.dependencia, dependencias, ubicaciones]);

    useEffect(() => {

        const sede = sedes.filter(item => item.id == formValues.sede)
        const dependencia = dependencias.filter(item => item.id == formValues.dependencia)
        const ubicacion = ubicaciones.filter(item => item.id == formValues.ubicaciones)


        setDataValues(values => ({ ...values, sede: sede[0]?.id + " - " + sede[0]?.nombre, dependencia: dependencia[0]?.tipo_ubicac + "" + dependencia[0]?.ubicac_fisica + " - " + dependencia[0]?.nombre, ubicaciones: ubicacion[0]?.id + " - " + ubicacion[0]?.nombre }))

    }, [formValues])

    const handlePrint = useReactToPrint({
        content: () => barcodeRef.current,
    });

    const handleBarcodePrint = () => {
        setPrintTrigger(true);
    };

    useEffect(() => {
        if (printTrigger) {
            handlePrint();
            setPrintTrigger(false);
        }
    }, [printTrigger]);
    return (
        <>
            <Flex justify="start" gap={"10px"}>

                <Select
                    placeholder="Sedes"
                    style={{ width: "350px" }}
                    options={sedes.map(item => {
                        return {
                            label: item.nombre,
                            value: item.id
                        }
                    })}
                    onChange={(e) => setFormValues(value => ({ ...value, sede: e }))}
                />

                <Select
                    placeholder="Dependencias"
                    style={{ width: "350px" }}
                    options={filteredDependencias.map(item => {
                        return {
                            label: item.nombre,
                            value: item.id
                        }
                    })}
                    onChange={(e) => setFormValues(value => ({ ...value, dependencia: e }))}

                />
                <Select
                    placeholder="Ubicaciones"
                    style={{ width: "350px" }}
                    options={filteredUbicaciones.map(item => {
                        return {
                            label: item.nombre,
                            value: item.id
                        }
                    })}
                    onChange={(e) => setFormValues(value => ({ ...value, ubicaciones: e }))}

                />
            </Flex>
            <Flex justify='center' align='center' style={{ marginTop: "100px" }}>
                <div
                    key={1}
                    ref={barcodeRef} style={{
                        width: "5.5cm",
                        height: "2.4cm",
                        textAlign: "center",
                        paddingTop: "5px",
                        paddingLeft: "5px",
                        paddingRight: "8px",
                        paddingBottom: "8px"
                        //                       padding: "0.4mm", display: !printTrigger ? "none" : "block"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2px",
                            padding: "2px"
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <img
                                src={image1}
                                alt="Custom Logo"
                                style={{ height: "15px", imageRendering: "crisp-edges" }}
                            />
                        </div>
                        <div
                            style={{
                                fontSize: "7px",
                                fontFamily: "Helvetica",
                                lineHeight: "1",
                                flex: 8,
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    width: "100%",
                                    letterSpacing: "0.4px",
                                    textRendering: "optimizeLegibility",
                                }}
                            >
                                PROYECTO ESPECIAL INTEGRAL MAJES SIGUAS
                                OFICINA DE CONTROL Y SANEAMIENTO
                                PATRIMONIAL
                            </p>

                        </div>
                        <div style={{ flex: 1 }}>
                            <img
                                src={image}
                                alt="Custom Logo"
                                style={{ height: "15px", imageRendering: "crisp-edges" }}
                            />
                        </div>
                    </div>

                    <Flex justify='center' align='center'>
                        <div
                            style={{
                                borderBottom: "0.2px solid black",
                                marginTop: "2px",
                                borderTop: 0,
                                width: "95%"
                            }}
                        ></div>
                    </Flex>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "5px"
                        }}
                    >

                        <QRCode
                            style={{ width: "30px", height: "30px" }}
                            viewBox={`0 0 256 256`}
                            value={"prueba"}
                        />

                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "4px", paddingLeft: "4px" }}>
                        <div style={{ flex: 3 }}>

                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "7px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong style={{ width: "100px" }}>SEDE:</strong>   {dataValues && dataValues.sede && dataValues?.sede}

                            </p>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "7px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong style={{ width: "100px" }}>ÁREA:</strong>   {dataValues && dataValues.dependencia && dataValues?.dependencia}


                            </p>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "7px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong >UBICACIÓN:</strong>  {dataValues && dataValues.ubicaciones && dataValues?.ubicaciones}

                            </p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "15px",
                                    marginTop: "4px",
                                    textRendering: "optimizeLegibility",
                                    textAlign: "right",
                                    paddingRight: "4px"
                                }}
                            >
                                {new Date().getFullYear()}

                            </p>
                        </div>
                    </div>
                </div>

            </Flex>
            <Flex justify='center' align='center'
            >
                <div
                    key={1}
                    style={{
                        width: "50%",
                        height: "50%",
                        textAlign: "center",
                        marginBottom: "2mm",
                        boxSizing: "border-box",
                        padding: "0.2mm",
                        border: "1px solid black", padding: "15px", borderRadius: "10px",
                        backgroundColor: "white"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2px",
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <img
                                src={image}
                                alt="Custom Logo"
                                style={{ height: "50px", imageRendering: "crisp-edges" }}
                            />
                        </div>
                        <div
                            style={{
                                fontSize: "15px",
                                fontFamily: "Helvetica",
                                lineHeight: "1",
                                flex: 8,
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    width: "100%",
                                    letterSpacing: "0.4px",
                                    textRendering: "optimizeLegibility",
                                    fontWeight: "bold"

                                }}
                            >
                                PROYECTO ESPECIAL INTEGRAL MAJES SIGUAS
                                PATRIMONIAL
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    width: "100%",
                                    letterSpacing: "0.4px",
                                    textRendering: "optimizeLegibility",
                                    fontWeight: "bold"

                                }}
                            >
                                OFICINA DE CONTROL Y SANEAMIENTO
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    width: "100%",
                                    letterSpacing: "0.4px",
                                    textRendering: "optimizeLegibility",
                                    fontWeight: "bold"
                                }}
                            >
                                PATRIMONIAL
                            </p>

                        </div>

                        <div style={{ flex: 1 }}>
                            <img
                                src={image1}
                                alt="Custom Logo"
                                style={{ height: "50px", imageRendering: "crisp-edges" }}
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <div
                            style={{
                                border: "0.2px solid black",
                                marginTop: "2px",
                                borderTop: 0,
                                width: "95%"
                            }}
                        >

                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px"
                        }}
                    >

                        <QRCode
                            style={{ width: "150px", height: "150px" }}
                            value={"prueba"}
                            viewBox={`0 0 256 256`}
                        />

                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
                        <div style={{ flex: 5, }}>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "12px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong style={{ width: "100px" }}>SEDE:</strong>   {dataValues && dataValues.sede ? dataValues?.sede : ""}

                            </p>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "12px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong style={{ width: "100px" }}>ÁREA:</strong>   {dataValues.dependencia ? dataValues?.dependencia : ""}


                            </p>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "12px",
                                    margin: 0,
                                    textRendering: "optimizeLegibility",
                                    textAlign: "left"
                                }}
                            >
                                <strong >UBICACIÓN:</strong>  {dataValues && dataValues.ubicaciones ? dataValues?.ubicaciones : ""}


                            </p>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p
                                style={{
                                    overflow: "hidden",
                                    fontFamily: "Helvetica",
                                    fontSize: "40px",
                                    marginTop: "4px",
                                    textRendering: "optimizeLegibility",
                                    textAlign: "right"
                                }}
                            >
                                {new Date().getFullYear()}

                            </p>
                        </div>
                    </div>
                </div>
            </Flex>

            {
                dataValues.sede !== "" && dataValues.dependencia !== "" && dataValues.ubicaciones !== "" ?
                    <Flex justify='end' align='center' style={{ marginTop: "40px", paddingRight: "150px" }}>

                        <Button type='primary' onClick={() => handleBarcodePrint()}>Imprimir Etiqueta</Button> </Flex> : ""
            }

        </>
    )
}

export default EtiquetasUbicaciones