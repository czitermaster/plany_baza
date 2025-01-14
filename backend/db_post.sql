/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     14.01.2025 16:07:26                          */
/*==============================================================*/


drop index RELATIONSHIP_4_FK;

drop index KIERUNEK_PK;

drop table KIERUNEK;

drop index OCENY_PK;

drop table OCENY;

drop index RELATIONSHIP_3_FK;

drop index PLANY_KSZTALCENIA_PK;

drop table PLANY_KSZTALCENIA;

drop index RELATIONSHIP_8_FK;

drop index RELATIONSHIP_5_FK;

drop index PRZEDMIOTY_PK;

drop table PRZEDMIOTY;

drop index RELATIONSHIP_7_FK;

drop index RELATIONSHIP_6_FK;

drop index RELATIONSHIP_5_PK;

drop table RELATIONSHIP_5;

drop index RELATIONSHIP_2_FK;

drop index RELATIONSHIP_1_FK;

drop index STUDENT_PK;

drop table STUDENT;

drop index WYKLADOWCY_PK;

drop table WYKLADOWCY;

/*==============================================================*/
/* Table: KIERUNEK                                              */
/*==============================================================*/
create table KIERUNEK (
   ID_KIERUNEK          SERIAL               not null,
   ID_WYKLADOWCA        INT4                 null,
   NAZWA_KIERUNKU       VARCHAR(40)          null,
   POZIOM_STUDIOW       VARCHAR(10)          null,
   constraint PK_KIERUNEK primary key (ID_KIERUNEK)
);

/*==============================================================*/
/* Index: KIERUNEK_PK                                           */
/*==============================================================*/
create unique index KIERUNEK_PK on KIERUNEK (
ID_KIERUNEK
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_4_FK on KIERUNEK (
ID_WYKLADOWCA
);

/*==============================================================*/
/* Table: OCENY                                                 */
/*==============================================================*/
create table OCENY (
   ID_OCENY             SERIAL               not null,
   OCENA                DECIMAL              null,
   DATA_OCENY           DATE                 null,
   constraint PK_OCENY primary key (ID_OCENY)
);

/*==============================================================*/
/* Index: OCENY_PK                                              */
/*==============================================================*/
create unique index OCENY_PK on OCENY (
ID_OCENY
);

/*==============================================================*/
/* Table: PLANY_KSZTALCENIA                                     */
/*==============================================================*/
create table PLANY_KSZTALCENIA (
   ID_PLANY_KSZTALCENIA SERIAL               not null,
   ID_STUDENT           INT4                 null,
   SEMESTR              VARCHAR(20)          null,
   ROK_AKADEMICKI       VARCHAR(10)          null,
   constraint PK_PLANY_KSZTALCENIA primary key (ID_PLANY_KSZTALCENIA)
);

/*==============================================================*/
/* Index: PLANY_KSZTALCENIA_PK                                  */
/*==============================================================*/
create unique index PLANY_KSZTALCENIA_PK on PLANY_KSZTALCENIA (
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_3_FK on PLANY_KSZTALCENIA (
ID_STUDENT
);

/*==============================================================*/
/* Table: PRZEDMIOTY                                            */
/*==============================================================*/
create table PRZEDMIOTY (
   ID_PRZEDMIOTY        SERIAL               not null,
   ID_KIERUNEK          INT4                 null,
   ID_PLANY_KSZTALCENIA INT4                 null,
   NAZWA_PRZEDMIOTU     VARCHAR(50)          null,
   LICZBA_ECTS          INT4                 null,
   constraint PK_PRZEDMIOTY primary key (ID_PRZEDMIOTY)
);

/*==============================================================*/
/* Index: PRZEDMIOTY_PK                                         */
/*==============================================================*/
create unique index PRZEDMIOTY_PK on PRZEDMIOTY (
ID_PRZEDMIOTY
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_5_FK on PRZEDMIOTY (
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Index: RELATIONSHIP_8_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_8_FK on PRZEDMIOTY (
ID_KIERUNEK
);

/*==============================================================*/
/* Table: RELATIONSHIP_5                                        */
/*==============================================================*/
create table RELATIONSHIP_5 (
   ID_PRZEDMIOTY        INT4                 not null,
   ID_OCENY             INT4                 not null,
   constraint PK_RELATIONSHIP_5 primary key (ID_PRZEDMIOTY, ID_OCENY)
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_PK                                     */
/*==============================================================*/
create unique index RELATIONSHIP_5_PK on RELATIONSHIP_5 (
ID_PRZEDMIOTY,
ID_OCENY
);

/*==============================================================*/
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_6_FK on RELATIONSHIP_5 (
ID_PRZEDMIOTY
);

/*==============================================================*/
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_7_FK on RELATIONSHIP_5 (
ID_OCENY
);

/*==============================================================*/
/* Table: STUDENT                                               */
/*==============================================================*/
create table STUDENT (
   ID_STUDENT           SERIAL               not null,
   ID_PLANY_KSZTALCENIA INT4                 null,
   ID_KIERUNEK          INT4                 null,
   IMIE                 VARCHAR(30)          null,
   NAZWISKO             VARCHAR(30)          null,
   PESEL                VARCHAR(20)          null,
   TELEFON              VARCHAR(15)          null,
   ROK_STUDIOW          INT4                 null,
   constraint PK_STUDENT primary key (ID_STUDENT)
);

/*==============================================================*/
/* Index: STUDENT_PK                                            */
/*==============================================================*/
create unique index STUDENT_PK on STUDENT (
ID_STUDENT
);

/*==============================================================*/
/* Index: RELATIONSHIP_1_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_1_FK on STUDENT (
ID_KIERUNEK
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on STUDENT (
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Table: WYKLADOWCY                                            */
/*==============================================================*/
create table WYKLADOWCY (
   ID_WYKLADOWCA        SERIAL               not null,
   IMIE                 VARCHAR(30)          null,
   NAZWISKO             VARCHAR(30)          null,
   TELEFON              VARCHAR(15)          null,
   EMAIL                VARCHAR(40)          null,
   constraint PK_WYKLADOWCY primary key (ID_WYKLADOWCA)
);

/*==============================================================*/
/* Index: WYKLADOWCY_PK                                         */
/*==============================================================*/
create unique index WYKLADOWCY_PK on WYKLADOWCY (
ID_WYKLADOWCA
);

alter table KIERUNEK
   add constraint FK_KIERUNEK_RELATIONS_WYKLADOW foreign key (ID_WYKLADOWCA)
      references WYKLADOWCY (ID_WYKLADOWCA)
      on delete restrict on update restrict;

alter table PLANY_KSZTALCENIA
   add constraint FK_PLANY_KS_RELATIONS_STUDENT foreign key (ID_STUDENT)
      references STUDENT (ID_STUDENT)
      on delete restrict on update restrict;

alter table PRZEDMIOTY
   add constraint FK_PRZEDMIO_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on delete restrict on update restrict;

alter table PRZEDMIOTY
   add constraint FK_PRZEDMIO_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on delete restrict on update restrict;

alter table RELATIONSHIP_5
   add constraint FK_RELATION_RELATIONS_PRZEDMIO foreign key (ID_PRZEDMIOTY)
      references PRZEDMIOTY (ID_PRZEDMIOTY)
      on delete restrict on update restrict;

alter table RELATIONSHIP_5
   add constraint FK_RELATION_RELATIONS_OCENY foreign key (ID_OCENY)
      references OCENY (ID_OCENY)
      on delete restrict on update restrict;

alter table STUDENT
   add constraint FK_STUDENT_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on delete restrict on update restrict;

alter table STUDENT
   add constraint FK_STUDENT_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on delete restrict on update restrict;

