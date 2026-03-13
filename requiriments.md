import 'package:flutter/material.dart';

class RegistroMatiFut extends StatefulWidget {
  @override
  _RegistroMatiFutState createState() => _RegistroMatiFutState();
}

class _RegistroMatiFutState extends State<RegistroMatiFut> {
  // Controladores para capturar el texto
  final TextEditingController _edadController = TextEditingController();
  final TextEditingController _pesoController = TextEditingController();
  final TextEditingController _dominadasController = TextEditingController();
  final TextEditingController _clubController = TextEditingController();
  
  String _dificultad = "";
  bool _conoceReglas = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Registro MatiFut')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Contenedor de Datos Físicos
            Card(
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: [
                    Text("Datos Cardiovasculares y Físicos", style: TextStyle(fontWeight: Bold)),
                    TextField(controller: _edadController, decoration: InputDecoration(labelText: "Edad")),
                    TextField(controller: _pesoController, decoration: InputDecoration(labelText: "Peso (kg)")),
                  ],
                ),
              ),
            ),
            SizedBox(height: 20),
            // Contenedor de Datos de Fútbol
            Card(
              color: Colors.green[50],
              child: Padding(
                padding: EdgeInsets.all(10),
                child: Column(
                  children: [
                    Text("Rendimiento en Cancha", style: TextStyle(fontWeight: Bold)),
                    TextField(controller: _dominadasController, decoration: InputDecoration(labelText: "¿Cuántas dominadas haces?")),
                    TextField(controller: _clubController, decoration: InputDecoration(labelText: "Club Favorito")),
                    SwitchListTile(
                      title: Text("¿Conoces las reglas básicas?"),
                      value: _conoceReglas,
                      onChanged: (bool value) { setState(() { _conoceReglas = value; }); },
                    ),
                    TextField(
                      onChanged: (val) => _dificultad = val,
                      decoration: InputDecoration(labelText: "¿Qué es lo que más se te dificulta?"),
                    ),
                  ],
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {
                // Aquí enviarías los datos a tu Backend (Node.js o Firebase)
                print("Datos guardados en MatiFut");
              },
              child: Text("Guardar Perfil"),
            )
          ],
        ),
      ),
    );
  }
}

