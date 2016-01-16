

# what is this?


funcionalidad basica


assignar un chat room a un usuario al abrir un incidence.

cuando este se cierre no cerramos la conexión. aunque permanece el notifyjs...
que nos reporta que incidence nos han reportado feedback


cada usuario, incia su socket asignandose un id_user al socket que abra
este id_user se registra en el servidor websocket vinculando el socket
con el identificador de usuario.

esto solamente abre una conexion de socket con el servidor, pero no lo vincula con ninguna incidencia
las incidencias se vinculan a posteriori en un segundo paso.

es decir, cuando arrancamos un cliente, este se registra en el servidor
estructura de datos basico para hacer el forwrding de las notificaciones.

clientOnline[user_id] = {socket: socket}
incidenceNotify[incidence_id] = {list: [user_id]}

Pasos
0  se registran los usuario.
1  un usuario se registra en una incidencia
3  se registra la incidencia en incidenceNotify y se añade el id de usuario.

2  cuando un usario envia un mensaje, esta va dirigido a alguna incidencia.


# how to:


## local

1. npm install
2. bower install
3. npm start


## remote:heroku

1. heroku init
2. git push heroku master
3. heroku open