drop database if exists agenda;
create database agenda;

\connect agenda

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

\copy islas from 'csv/islas.csv' DELIMITERS ',' CSV;
\copy municipios from 'csv/municipios.csv' DELIMITERS ',' CSV;
\copy espaciosagenda from 'csv/espaciosagenda.csv' DELIMITERS ',' CSV;
\copy agendacultural from 'csv/agendacultural.csv' DELIMITERS ',' NULL AS 'NULL' CSV;
