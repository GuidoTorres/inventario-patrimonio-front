import React, { useContext, useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./styles/administrador.css";
import HeaderContent from "../components/HeaderContent";
import Sidebar from "../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { InventarioContext } from "../context/InventarioContext";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import Inventario from "../components/proceso/Inventario";
import Consultas from "../components/proceso/Consultas";
import Reportes from "../components/reportes/Reportes";

import ConsultaSiga from "../components/consultas/ConsultaSiga";
import MenuInventario from "../components/proceso/MenuInventario";
import EtiquetasUbicaciones from "../components/proceso/EtiquetasUbicaciones";
import EtiquetasBienes from "../components/proceso/EtiquetasBienes";
import TarjetasCargo from "../components/proceso/TarjetasCargo";
import MenuConfiguracion from "../components/configuracion/MenuConfiguracion";
import MenuConsultas from "../components/consultas/MenuConsultas";
import Login from "../components/login/Login";
import Usuarios from "../components/configuracion/Usuarios";
import Jefes from "../components/configuracion/Jefes";
import Inventariadores from "../components/configuracion/Inventariadores";
import Ubicaciones from "../components/configuracion/Ubicaciones";

const { Sider, Header, Content } = Layout;

const Administrador = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);
  const [title, setTitle] = useState("Proceso");
  const { setIsLogged, isLogged } = useContext(InventarioContext);
  const [loading, setLoading] = useState(true);

  // Solicitar el token desde Electron y actualizar el estado de autenticación
  useEffect(() => {
    if (window.electron && window.electron.sendTokenRequest) {
      window.electron.sendTokenRequest(); // Solicitar el token al proceso principal
      window.electron.onTokenData((token) => {
        if (token) {
          setIsLogged(true); // Actualizar el estado si hay un token
        } else {
          setIsLogged(false);
        }
        setLoading(false); // Finalizar la carga
      });
    } else {
      setLoading(false); // Si no se puede acceder a electron, dejar de cargar
    }
  }, [setIsLogged]);

  return (
    <Layout>
      {!isLogged ? (
        <Login setIsLogged={setIsLogged} />
      ) : (
        <>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider"
          >
            {" "}
            <Sidebar />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="triger-btn"
            />
          </Sider>

          <Layout style={{ background: "#F6F7F9" }}>
            <Header className="header">
              <HeaderContent title={title} />
            </Header>
            <Content className="content">
              <Routes>
                <Route
                  path="/inventario"
                  element={
                    <ProtectedRoute>
                      <MenuInventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/inventario/menu"
                  element={
                    <ProtectedRoute>
                      <MenuInventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/inventario/registro"
                  element={
                    <ProtectedRoute>
                      <Inventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/inventario/cargo"
                  element={
                    <ProtectedRoute>
                      <Inventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventario/bienes"
                  element={
                    <ProtectedRoute>
                      <Inventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventario/ubicaciones"
                  element={
                    <ProtectedRoute>
                      <Inventario setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/inventario/etiquetas"
                  element={
                    <ProtectedRoute>
                      <EtiquetasUbicaciones setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventario/etiquetas/bienes"
                  element={
                    <ProtectedRoute>
                      <EtiquetasBienes setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inventario/cargos"
                  element={
                    <ProtectedRoute>
                      <TarjetasCargo setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/consulta"
                  element={
                    <ProtectedRoute>
                      <MenuConsultas setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consulta/siga"
                  element={
                    <ProtectedRoute>
                      <ConsultaSiga setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consulta/inventariados"
                  element={
                    <ProtectedRoute>
                      <Consultas setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/consulta/faltantes"
                  element={
                    <ProtectedRoute>
                      <Consultas setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracion"
                  element={
                    <ProtectedRoute>
                      <MenuConfiguracion setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracion/usuarios"
                  element={
                    <ProtectedRoute>
                      <Usuarios setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracion/jefes"
                  element={
                    <ProtectedRoute>
                      <Jefes setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracion/inventariadores"
                  element={
                    <ProtectedRoute>
                      <Inventariadores setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/configuracion/ubicaciones"
                  element={
                    <ProtectedRoute>
                      <Ubicaciones setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reportes"
                  element={
                    <ProtectedRoute>
                      <Reportes setTitle={setTitle} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default Administrador;
