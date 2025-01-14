/*==============================================================*/
/* DBMS name:      Sybase SQL Anywhere 12                       */
/* Created on:     12.01.2025 16:33:05                          */
/*==============================================================*/


if exists(select 1 from sys.sysforeignkey where role='FK_KIERUNEK_RELATIONS_WYKLADOW') then
    alter table KIERUNEK
       delete foreign key FK_KIERUNEK_RELATIONS_WYKLADOW
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_PLANY_KS_RELATIONS_STUDENT') then
    alter table PLANY_KSZTALCENIA
       delete foreign key FK_PLANY_KS_RELATIONS_STUDENT
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_PRZEDMIO_RELATIONS_PLANY_KS') then
    alter table PRZEDMIOTY
       delete foreign key FK_PRZEDMIO_RELATIONS_PLANY_KS
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_PRZEDMIO_RELATIONS_KIERUNEK') then
    alter table PRZEDMIOTY
       delete foreign key FK_PRZEDMIO_RELATIONS_KIERUNEK
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_RELATION_RELATIONS_PRZEDMIO') then
    alter table RELATIONSHIP_5
       delete foreign key FK_RELATION_RELATIONS_PRZEDMIO
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_RELATION_RELATIONS_OCENY') then
    alter table RELATIONSHIP_5
       delete foreign key FK_RELATION_RELATIONS_OCENY
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_STUDENT_RELATIONS_KIERUNEK') then
    alter table STUDENT
       delete foreign key FK_STUDENT_RELATIONS_KIERUNEK
end if;

if exists(select 1 from sys.sysforeignkey where role='FK_STUDENT_RELATIONS_PLANY_KS') then
    alter table STUDENT
       delete foreign key FK_STUDENT_RELATIONS_PLANY_KS
end if;

drop index if exists KIERUNEK.RELATIONSHIP_4_FK;

drop index if exists KIERUNEK.KIERUNEK_PK;

drop table if exists KIERUNEK;

drop index if exists OCENY.OCENY_PK;

drop table if exists OCENY;

drop index if exists PLANY_KSZTALCENIA.RELATIONSHIP_3_FK;

drop index if exists PLANY_KSZTALCENIA.PLANY_KSZTALCENIA_PK;

drop table if exists PLANY_KSZTALCENIA;

drop index if exists PRZEDMIOTY.RELATIONSHIP_8_FK;

drop index if exists PRZEDMIOTY.RELATIONSHIP_5_FK;

drop index if exists PRZEDMIOTY.PRZEDMIOTY_PK;

drop table if exists PRZEDMIOTY;

drop index if exists RELATIONSHIP_5.RELATIONSHIP_7_FK;

drop index if exists RELATIONSHIP_5.RELATIONSHIP_6_FK;

drop index if exists RELATIONSHIP_5.RELATIONSHIP_5_PK;

drop table if exists RELATIONSHIP_5;

drop index if exists STUDENT.RELATIONSHIP_2_FK;

drop index if exists STUDENT.RELATIONSHIP_1_FK;

drop index if exists STUDENT.STUDENT_PK;

drop table if exists STUDENT;

drop index if exists WYKLADOWCY.WYKLADOWCY_PK;

drop table if exists WYKLADOWCY;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_KIERUNEK') then
      drop sequence S_KIERUNEK
end if;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_OCENY') then
      drop sequence S_OCENY
end if;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_PLANY_KSZTALCENIA') then
      drop sequence S_PLANY_KSZTALCENIA
end if;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_PRZEDMIOTY') then
      drop sequence S_PRZEDMIOTY
end if;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_STUDENT') then
      drop sequence S_STUDENT
end if;

if exists(select 1 from sys.syssequence s
   where sequence_name='S_WYKLADOWCY') then
      drop sequence S_WYKLADOWCY
end if;

create sequence S_KIERUNEK;

create sequence S_OCENY;

create sequence S_PLANY_KSZTALCENIA;

create sequence S_PRZEDMIOTY;

create sequence S_STUDENT;

create sequence S_WYKLADOWCY;

/*==============================================================*/
/* Table: KIERUNEK                                              */
/*==============================================================*/
create table KIERUNEK 
(
   ID_KIERUNEK          integer                        not null default (S_KIERUNEK.nextval),
   ID_WYKLADOWCA        integer                        null,
   NAZWA_KIERUNKU       varchar(40)                    null,
   POZIOM_STUDIOW       varchar(10)                    null,
   constraint PK_KIERUNEK primary key (ID_KIERUNEK)
);

/*==============================================================*/
/* Index: KIERUNEK_PK                                           */
/*==============================================================*/
create unique index KIERUNEK_PK on KIERUNEK (
ID_KIERUNEK ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_4_FK on KIERUNEK (
ID_WYKLADOWCA ASC
);

/*==============================================================*/
/* Table: OCENY                                                 */
/*==============================================================*/
create table OCENY 
(
   ID_OCENY             integer                        not null default (S_OCENY.nextval),
   OCENA                decimal                        null,
   DATA_OCENY           date                           null,
   constraint PK_OCENY primary key (ID_OCENY)
);

/*==============================================================*/
/* Index: OCENY_PK                                              */
/*==============================================================*/
create unique index OCENY_PK on OCENY (
ID_OCENY ASC
);

/*==============================================================*/
/* Table: PLANY_KSZTALCENIA                                     */
/*==============================================================*/
create table PLANY_KSZTALCENIA 
(
   ID_PLANY_KSZTALCENIA integer                        not null default (S_PLANY_KSZTALCENIA.nextval),
   ID_STUDENT           integer                        null,
   SEMESTR              varchar(20)                    null,
   ROK_AKADEMICKI       varchar(10)                    null,
   constraint PK_PLANY_KSZTALCENIA primary key (ID_PLANY_KSZTALCENIA)
);

/*==============================================================*/
/* Index: PLANY_KSZTALCENIA_PK                                  */
/*==============================================================*/
create unique index PLANY_KSZTALCENIA_PK on PLANY_KSZTALCENIA (
ID_PLANY_KSZTALCENIA ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_3_FK on PLANY_KSZTALCENIA (
ID_STUDENT ASC
);

/*==============================================================*/
/* Table: PRZEDMIOTY                                            */
/*==============================================================*/
create table PRZEDMIOTY 
(
   ID_PRZEDMIOTY        integer                        not null default (S_PRZEDMIOTY.nextval),
   ID_KIERUNEK          integer                        null,
   ID_PLANY_KSZTALCENIA integer                        null,
   NAZWA_PRZEDMIOTU     varchar(50)                    null,
   LICZBA_ECTS          integer                        null,
   constraint PK_PRZEDMIOTY primary key (ID_PRZEDMIOTY)
);

/*==============================================================*/
/* Index: PRZEDMIOTY_PK                                         */
/*==============================================================*/
create unique index PRZEDMIOTY_PK on PRZEDMIOTY (
ID_PRZEDMIOTY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_5_FK on PRZEDMIOTY (
ID_PLANY_KSZTALCENIA ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_8_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_8_FK on PRZEDMIOTY (
ID_KIERUNEK ASC
);

/*==============================================================*/
/* Table: RELATIONSHIP_5                                        */
/*==============================================================*/
create table RELATIONSHIP_5 
(
   ID_PRZEDMIOTY        integer                        not null,
   ID_OCENY             integer                        not null,
   constraint PK_RELATIONSHIP_5 primary key clustered (ID_PRZEDMIOTY, ID_OCENY)
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_PK                                     */
/*==============================================================*/
create unique clustered index RELATIONSHIP_5_PK on RELATIONSHIP_5 (
ID_PRZEDMIOTY ASC,
ID_OCENY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_6_FK on RELATIONSHIP_5 (
ID_PRZEDMIOTY ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_7_FK on RELATIONSHIP_5 (
ID_OCENY ASC
);

/*==============================================================*/
/* Table: STUDENT                                               */
/*==============================================================*/
create table STUDENT 
(
   ID_STUDENT           integer                        not null default (S_STUDENT.nextval),
   ID_PLANY_KSZTALCENIA integer                        null,
   ID_KIERUNEK          integer                        null,
   IMIE                 varchar(30)                    null,
   NAZWISKO             varchar(30)                    null,
   PESEL                varchar(20)                    null,
   TELEFON              varchar(15)                    null,
   ROK_STUDIOW          integer                        null,
   constraint PK_STUDENT primary key (ID_STUDENT)
);

/*==============================================================*/
/* Index: STUDENT_PK                                            */
/*==============================================================*/
create unique index STUDENT_PK on STUDENT (
ID_STUDENT ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_1_FK on STUDENT (
ID_KIERUNEK ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create index RELATIONSHIP_2_FK on STUDENT (
ID_PLANY_KSZTALCENIA ASC
);

/*==============================================================*/
/* Table: WYKLADOWCY                                            */
/*==============================================================*/
create table WYKLADOWCY 
(
   ID_WYKLADOWCA        integer                        not null default (S_WYKLADOWCY.nextval),
   IMIE                 varchar(30)                    null,
   NAZWISKO             varchar(30)                    null,
   TELEFON              varchar(15)                    null,
   EMAIL                varchar(40)                    null,
   constraint PK_WYKLADOWCY primary key (ID_WYKLADOWCA)
);

/*==============================================================*/
/* Index: WYKLADOWCY_PK                                         */
/*==============================================================*/
create unique index WYKLADOWCY_PK on WYKLADOWCY (
ID_WYKLADOWCA ASC
);

alter table KIERUNEK
   add constraint FK_KIERUNEK_RELATIONS_WYKLADOW foreign key (ID_WYKLADOWCA)
      references WYKLADOWCY (ID_WYKLADOWCA)
      on update restrict
      on delete restrict;

alter table PLANY_KSZTALCENIA
   add constraint FK_PLANY_KS_RELATIONS_STUDENT foreign key (ID_STUDENT)
      references STUDENT (ID_STUDENT)
      on update restrict
      on delete restrict;

alter table PRZEDMIOTY
   add constraint FK_PRZEDMIO_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on update restrict
      on delete restrict;

alter table PRZEDMIOTY
   add constraint FK_PRZEDMIO_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on update restrict
      on delete restrict;

alter table RELATIONSHIP_5
   add constraint FK_RELATION_RELATIONS_PRZEDMIO foreign key (ID_PRZEDMIOTY)
      references PRZEDMIOTY (ID_PRZEDMIOTY)
      on update restrict
      on delete restrict;

alter table RELATIONSHIP_5
   add constraint FK_RELATION_RELATIONS_OCENY foreign key (ID_OCENY)
      references OCENY (ID_OCENY)
      on update restrict
      on delete restrict;

alter table STUDENT
   add constraint FK_STUDENT_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on update restrict
      on delete restrict;

alter table STUDENT
   add constraint FK_STUDENT_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on update restrict
      on delete restrict;

