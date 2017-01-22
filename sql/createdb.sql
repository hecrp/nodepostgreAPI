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

create table titularidadesespacios (id int primary key,
                             titularidad varchar);

create table titularesespacios (id int primary key,
                                  titular varchar,
                                  idcaracter int references titularidadesespacios(id));

create table espaciosagenda (id int primary key,
                             archivo char(1),
                             auditorio char(1),
                             biblioteca char(1),
                             centro_cultural char(1)
                             centro_de_interpretacion char(1),
                             centro_docente char(1),
                             cine char(1),
                             galeria_de_arte char(1),
                             museo char(1),
                             sala_de_conciertos char(1),
                             sala_de_exposiciones char(1),
                             sala_polivalente char(1),
                             teatro char(1),
                             idmuni int references municipios(id),
                             denominacion varchar,
                             direccion varchar,
                             codpos varchar,
                             telefono varchar,
                             fax varchar,
                             mail varchar,
                             web varchar,
                             horario varchar,
                             instalaciones varchar,
                             aforo varchar,
                             id_titular int,
                             facebook varchar,
                             youtube varchar,
                             twitter varchar,
                             imag01 varchar,
                             imag02 varchar,
                             usuario varchar,
                             fechor varchar,
                             lat varchar,
                             lng varchar,
                             usoprincipal varchar);

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
\copy espaciosagenda from 'csv/espaciosagenda2.csv' DELIMITERS ',' CSV;
\copy agendacultural from 'csv/agendacultural.csv' DELIMITERS ',' NULL AS 'NULL' CSV;
