from nicegui import ui
import json
import os
from datetime import datetime

# Archivo donde se guardarán los datos
DATA_FILE = 'registro_biotech.json'

def cargar_datos():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

# Configuración de los colores (Verdes llamativos combinados con acentos cálidos y oscuros)
ui.colors(primary='#2ecc71', secondary='#27ae60', accent='#f39c12', positive='#1abc9c', dark='#2c3e50', info='#16a085')

# Estilos globales con CSS inyectado
ui.add_head_html('''
<style>
    body {
        /* Fondo con gradiente verde claro brillante */
        background: linear-gradient(135deg, #e8f8f5 0%, #d5f5e3 100%);
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        margin: 0;
        min-height: 100vh;
    }
    .titulo-principal {
        color: #1e8449; /* Verde muy fuerte y oscuro */
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        letter-spacing: -0.5px;
    }
    .tarjeta-formulario {
        background-color: rgba(255, 255, 255, 0.95);
        border-top: 6px solid #2ecc71; /* Borde superior esmeralda */
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(39, 174, 96, 0.15); /* Sombra verdosa */
        backdrop-filter: blur(10px);
    }
    .boton-guardar {
        background: linear-gradient(90deg, #2ecc71, #27ae60);
        transition: all 0.3s ease;
        border: none;
    }
    .boton-guardar:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(46, 204, 113, 0.4);
        background: linear-gradient(90deg, #27ae60, #2ecc71);
    }
    .seccion-titulo {
        border-bottom: 2px solid #e8f8f5;
        padding-bottom: 8px;
    }
</style>
''')

# Contenedor centralizado
with ui.column().classes('w-full max-w-5xl mx-auto p-4 sm:p-8 items-center'):
    
    # --- ENCABEZADO DE LA APLICACIÓN ---
    with ui.row().classes('items-center mb-2 justify-center w-full'):
        ui.icon('biotech', color='primary', size='5rem').classes('mr-4')
        ui.label('Portal de Ciencias Biológicas').classes('text-4xl md:text-6xl titulo-principal font-extrabold text-center')
    
    ui.label('🔬 Conectando mentes para el futuro de la ciencia y la naturaleza.').classes('text-xl md:text-2xl text-dark mb-10 opacity-80 text-center font-medium')
    
    # --- FORMULARIO DE RECOPILACIÓN DE DATOS ---
    with ui.card().classes('w-full p-6 md:p-10 tarjeta-formulario mb-12'):
        ui.label('Registro de Investigadores, Estudiantes y Aficionados').classes('text-2xl md:text-3xl font-bold mb-3 text-secondary')
        ui.label('Ingresa tus datos personales y académicos para formar parte de nuestra red comunitaria biotecnológica.').classes('mb-8 text-gray-600 text-lg')
        
        # Division en dos columnas para el formulario
        with ui.row().classes('w-full gap-8'):
            
            # COLUMNA 1: Datos Personales
            with ui.column().classes('flex-1 min-w-[300px]'):
                with ui.row().classes('items-center mb-4 seccion-titulo w-full'):
                    ui.icon('person', color='info', size='1.5rem').classes('mr-2')
                    ui.label('Información Personal').classes('text-xl font-bold text-dark')
                    
                nombre = ui.input(label='Nombres Completos').classes('w-full mb-4 text-lg')
                apellidos = ui.input(label='Apellidos').classes('w-full mb-4 text-lg')
                
                # Fila para correo y teléfono
                with ui.row().classes('w-full gap-4'):
                    correo = ui.input(label='Correo Electrónico').classes('flex-1 mb-4 text-lg')
                    telefono = ui.input(label='Teléfono de Contacto').classes('flex-1 mb-4 text-lg')
                    
                ciudad = ui.input(label='Ciudad / País de Residencia').classes('w-full mb-4 text-lg')

            # COLUMNA 2: Perfil Biotecnológico
            with ui.column().classes('flex-1 min-w-[300px]'):
                with ui.row().classes('items-center mb-4 seccion-titulo w-full'):
                    ui.icon('science', color='info', size='1.5rem').classes('mr-2')
                    ui.label('Perfil Científico / Biotecnológico').classes('text-xl font-bold text-dark')
                    
                ocupacion = ui.input(label='Ocupación (Estudiante, Investigador, etc.)').classes('w-full mb-4 text-lg')
                
                areas_color = [
                    'Biotecnología Médica (Roja)', 
                    'Biotecnología Agrícola (Verde)', 
                    'Biotecnología Industrial (Blanca)', 
                    'Biotecnología Marina (Azul)', 
                    'Biotecnología Ambiental (Gris)'
                ]
                area_interes = ui.select(areas_color, label='Área de Especialización Principal').classes('w-full mb-4 text-lg')
                
                institucion = ui.input(label='Institución Educativa o Empresa').classes('w-full mb-4 text-lg')
        
        # Campo de amplitud total para observaciones
        observaciones = ui.textarea(label='¿Qué iniciativas o problemas ambientales te gustaría resolver?').classes('w-full mb-8 text-lg bg-gray-50')
        
        # Función que se ejecuta al presionar "Registrar"
        def guardar_datos():
            if not nombre.value or not apellidos.value or not correo.value:
                ui.notify('Por favor, ingresa obligatoriamente al menos Nombres, Apellidos y Correo.', type='warning', position='top')
                return
            
            nuevo_registro = {
                'fecha': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'nombres': nombre.value,
                'apellidos': apellidos.value,
                'correo': correo.value,
                'telefono': telefono.value,
                'ciudad': ciudad.value,
                'ocupacion': ocupacion.value,
                'area': area_interes.value,
                'institucion': institucion.value,
                'observaciones': observaciones.value
            }
            
            datos = cargar_datos()
            datos.append(nuevo_registro)
            
            # Guardar en JSON apuntando al archivo
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                json.dump(datos, f, ensure_ascii=False, indent=4)
                
            ui.notify('¡Hola biotecnólogo! Tus datos se han registrado correctamente en el sistema.', type='positive', icon='check_circle', position='top-right')
            
            # Limpiar los inputs del formulario
            nombre.value = ''
            apellidos.value = ''
            correo.value = ''
            telefono.value = ''
            ciudad.value = ''
            ocupacion.value = ''
            area_interes.value = None
            institucion.value = ''
            observaciones.value = ''
            
            # Refrescar vista de la tabla
            actualizar_tabla()
            
        # Botón espectacular
        ui.button('UNIRSE A LA COMUNIDAD BIOTECH', on_click=guardar_datos, icon='how_to_reg').classes('w-full text-xl py-4 mt-4 text-white font-bold rounded-xl boton-guardar cursor-pointer shadow-lg')

    # --- SECCIÓN DE VISUALIZACIÓN DE REGISTROS ---
    with ui.row().classes('items-center mb-6 w-full'):
        ui.icon('table_view', color='dark', size='2rem').classes('mr-3')
        ui.label('Directorio de la Comunidad Biotech (Datos Guardados)').classes('text-3xl font-bold text-dark')
    
    # Componentes donde se renderizará o se ocultará la tabla dinámica
    contenedor_tabla = ui.column().classes('w-full')
    mensaje_vacio = ui.label('Aún no hay investigadores registrados en este nodo. ¡Sé el primero! 🌱').classes('text-gray-600 italic mt-2 text-xl bg-white p-6 rounded-lg w-full text-center border-l-4 border-primary shadow-sm')
    
    # Columnas de la tabla interactiva
    columnas = [
        {'name': 'nombre_completo', 'label': 'Científico / Entusiasta (Nombre)', 'field': 'nombre_completo', 'align': 'left', 'sortable': True},
        {'name': 'area', 'label': 'Área Biotecnológica', 'field': 'area', 'align': 'left', 'sortable': True},
        {'name': 'ocupacion', 'label': 'Perfil / Profesión', 'field': 'ocupacion', 'align': 'left'},
        {'name': 'ciudad', 'label': 'Ubicación', 'field': 'ciudad', 'align': 'left'},
        {'name': 'fecha', 'label': 'Fecha de Ingreso', 'field': 'fecha', 'align': 'right', 'sortable': True},
    ]
    
    # Se define la tabla y se oculta de entrada (Se controla su visibilidad después)
    tabla = ui.table(columns=columnas, rows=[], row_key='nombre_completo').classes('w-full bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100')
    
    # Función para actualizar las filas de la tabla cuando se guarda algo
    def actualizar_tabla():
        datos = cargar_datos()
        if len(datos) == 0:
            mensaje_vacio.set_visibility(True)
            tabla.set_visibility(False)
        else:
            mensaje_vacio.set_visibility(False)
            tabla.set_visibility(True)
            
            # Transformar datos brutos a filas amigables para la tabla
            filas_tabla = []
            for d in datos:
                nombre_completo = f"{d.get('nombres', '')} {d.get('apellidos', '')}".strip()
                if not nombre_completo:
                    nombre_completo = "Anónimo"
                
                filas_tabla.append({
                    'nombre_completo': nombre_completo,
                    'area': d.get('area') or 'No especificada',
                    'ocupacion': d.get('ocupacion') or '-',
                    'ciudad': d.get('ciudad') or '-',
                    'fecha': d.get('fecha', '')
                })
            
            # Refrescar filas
            tabla.rows.clear()
            tabla.rows.extend(filas_tabla)
            tabla.update()
            
    # Llamar estado inicial
    actualizar_tabla()

# Iniciar servidor NiceGUI
ui.run(title='Innovación Biotech | Red Global', favicon='🌱', language='es-ES', port=8080)

