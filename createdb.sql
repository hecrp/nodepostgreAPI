drop database if exist agenda;
create dabatase agenda;

\connect agenda

create user usuario with password 'password';
grant all privileges on database agenda to usuario;

create table islas (id int primary key,
                    isla varchar,
                    abr varchar);

create table municipios (id int primary key,
                         idisla int references islas(id),
                         desmuni varchar,
                         idprov int);

create table espaciosagenda (id int primary key,
                             denominacion varchar,
                             idisla int references islas(id),
                             idmunicipio int references municipios(id));

create table agendacultural (id int primary key,
                            publicar char(1),
                            tipoagenda int,
                            fecini date,
                            fecfin date,
                            dias int,
                            tipo int,
                            isla int references islas(id),
                            municipio int references municipios(id),
                            espacio int references espaciosagenda(id),
                            lugar varchar,
                            titulo varchar,
                            subtitulo varchar,
                            descripcion varchar,
                            hora char(2),
                            minuto char(2),
                            imagen varchar,
                            masinfo varchar,
                            tipomasinfo char (1),
                            usuario varchar,
                            fechor timestamp);

copy islas from '/home/hector/WebstormProjects/CulturalEventsAPI/csv/islas.csv' DELIMITERS ',' CSV;

copy municipios from '/home/hector/WebstormProjects/CulturalEventsAPI/csv/municipios.csv' DELIMITERS ',' CSV;

copy espaciosagenda from '/home/hector/WebstormProjects/CulturalEventsAPI/csv/espaciosagenda.csv' DELIMITERS ',' CSV;

copy agendacultural from '/home/hector/WebstormProjects/CulturalEventsAPI/csv/agendacultural.csv' DELIMITERS ',' NULL AS 'NULL' CSV;

grant all privileges on table islas to usuario;
grant all privileges on table municipios to usuario;
grant all privileges on table espaciosagenda to usuario;
grant all privileges on table agendacultural to usuario;