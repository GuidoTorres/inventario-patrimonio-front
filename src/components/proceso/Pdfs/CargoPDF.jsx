import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import img from "../../../assets/autodema.png"
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 7,
        position:"relative"
    },

    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableColHeader: {
        width: "10%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderBottomColor: "#000",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCol: {
        width: "10%",
        borderStyle: "solid",
        borderColor: "#bfbfbf",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellHeader: {
        margin: 5,
        fontWeight: "bold",
    },
    tableCell: {
        margin: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30, // Ajusta según el margen inferior que desees
        left: 30,
        right: 30,
    },
    signatureRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    signatureItem: {
        width: '30%',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 6,
        textAlign: "justify", // Asegura que el texto esté justificado
        width: "100%", // Asegura que el contenedor ocupe el 100% del ancho disponible
    },
});
const CargoPDF = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 2, alignItems: "flex-start" }}>
                        <Image src={img} />
                    </View>
                    <View style={{ flex: 4, alignItems: "center", marginTop: "20px" }}>
                        <Text>Comisión de Inventario Bienes Muebles</Text>
                        <Text>{"Año" + " " + dayjs().format("YYYY")}</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: "flex-end", marginTop: "20px" }}>

                        <Text>Hojas</Text>
                        <Text>{dayjs().format("DD/MM/YYYY")}</Text>
                    </View>

                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", marginTop: "10px" }}>

                    <View style={{ flex: 4, alignItems: "center" }}>
                        <Text style={{ fontSize: "15px" }}>TARJETA DE CARGO</Text>
                        <Text>{"EJERCICIO" + " " + dayjs().format("YYYY")}</Text>
                    </View>


                </View>


                {/* DATOS */}

                <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", marginTop: "10px", gap: "5px" }}>

                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text>Usuario:RUTH MARINA GONZALES DURAND</Text>
                        <Text>Dependencia: SUBDIRECCION DE BIENESTAR UNIVERSITARIA</Text>
                        <Text>Ubicación: 52.1-201 - DIRECCIÓN</Text>

                    </View>
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text>Sede: 52.1 - CUNA JARDIN UNSA</Text>
                        <Text>Jefe de Grupo: JUAN JOSE HUISARAYME MEDINA</Text>

                    </View>


                </View>


                {/* Tabla */}
                <View style={{ width: "100%", marginTop: "20px", borderBottomWidth: "1px", height:"70%" }}>
                    {/* Cabecera de la tabla */}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", borderBottomWidth: "1px", borderTopWidth: "1px" }}>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>N°</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Código</Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Denominación</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Marca</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Modelo</Text>
                        </View>
                        <View style={{ width: "10%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Color</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>Serie</Text>
                        </View>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCellHeader, { textAlign: "center" }]}>E</Text>
                        </View>
                    </View>

                    {/* Filas de la tabla */}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>1</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>74645335508</Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Archivador de Madera</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>MARCA</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Negro</Text>
                        </View>
                        <View style={{ width: "10%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>ABC123</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Serie</Text>
                        </View>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>E</Text>
                        </View>
                    </View>
                    {/* Filas de la tabla */}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>1</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>74645335508</Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Archivador de Madera</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>MARCA</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Negro</Text>
                        </View>
                        <View style={{ width: "10%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>ABC123</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Serie</Text>
                        </View>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>E</Text>
                        </View>
                    </View>

                    {/* Filas de la tabla */}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>1</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>74645335508</Text>
                        </View>
                        <View style={{ width: "20%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Archivador de Madera</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>MARCA</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Negro</Text>
                        </View>
                        <View style={{ width: "10%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>ABC123</Text>
                        </View>
                        <View style={{ width: "15%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>Serie</Text>
                        </View>
                        <View style={{ width: "5%" }}>
                            <Text style={[styles.tableCell, { textAlign: "center" }]}>E</Text>
                        </View>
                    </View>

                </View>
                <View>
                    <Text style={{ fontSize: "6px" }}>Leyenda: B=Bueno R=Regular M=Malo X=RAEE Y=Chatarra</Text>


                </View>

                {/* Footer - Firmas */}
                <View style={styles.footer}>
                    <View style={styles.signatureRow}>
                        <View style={styles.signatureItem}>
                            <Text>_______________________________</Text>
                            <Text>PRESIDENTE COMISIÓN DE INV 2024</Text>
                        </View>
                        <View style={styles.signatureItem}>
                            <Text>______________________</Text>
                            <Text>V.B CONTROL PATRIMONIAL</Text>
                        </View>
                        <View style={styles.signatureItem}>
                            <Text>______________________</Text>
                            <Text>USUARIO FINAL</Text>
                        </View>
                    </View>

                    <View style={styles.footerText}>
                        <Text style={{ fontSize: "6px", width:"100%",  }}>
                            El usuario declara haber mostrado todos los bienes que se encuentran bajo responsabilidad...
                        </Text>
                        <Text style={{ fontSize: "6px", width:"100%" }}>
                            El usuario es responsable de la permanencia y conservación de cada uno de los bienes muebles...
                        </Text>
                        <Text style={{ fontSize: "6px", width:"100%" }}>
                            Cualquier necesidad de traslado del bien mueble dentro o fuera del local de la entidad...
                        </Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default CargoPDF