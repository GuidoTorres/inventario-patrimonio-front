import { Flex, Input, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const TarjetasCargo = ({setTitle}) => {
    useEffect(() => {
        setTitle("Tarjetas de Cargo")

    }, [])
    const [ubicaciones, setUbicaciones] = useState([])
    const [formValues, setFormValues] = useState()

    useEffect(() => {

        getUbicaciones()
    }, [])

    const getUbicaciones = async () => {

        const response = await fetch(
            `http://localhost:3006/api/v1/ubicaciones`
        );

        if (response.ok) {
            const info = await response.json();
            setUbicaciones(info); // Guardar los bienes en el estado si la respuesta es exitosa
        }

    }
    return (
        <>
            <Typography.Text>Busqueda de </Typography.Text>
            <Flex justify="start" gap={"10px"} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px" }}>

                <Input placeholder='Cod. Ubicación' />
                <Input placeholder='DNI' />
            </Flex>
        </>
    )
}

export default TarjetasCargo