/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     01.02.2025 12:06:56                          */
/*==============================================================*/


drop index KIERUNEK_PK;

drop table KIERUNEK;

drop index RELATIONSHIP_7_FK;

drop index PLANY_KSZTALCENIA_PK;

drop table PLANY_KSZTALCENIA;

drop index RELATIONSHIP_6_FK;

drop index PRZEDMIOTY_PK;

drop table PRZEDMIOTY;

drop index RELATIONSHIP_3_FK;

drop index RELATIONSHIP_2_FK;

drop index RELATIONSHIP_2_PK;

drop table RELATIONSHIP_2;

drop index RELATIONSHIP_5_FK;

drop index RELATIONSHIP_4_FK;

drop index RELATIONSHIP_3_PK;

drop table RELATIONSHIP_3;

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
/* Table: PLANY_KSZTALCENIA                                     */
/*==============================================================*/
create table PLANY_KSZTALCENIA (
   ID_PLANY_KSZTALCENIA SERIAL               not null,
   ID_KIERUNEK          INT4                 null,
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
/* Index: RELATIONSHIP_7_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_7_FK on PLANY_KSZTALCENIA (
ID_KIERUNEK
);

/*==============================================================*/
/* Table: PRZEDMIOTY                                            */
/*==============================================================*/
create table PRZEDMIOTY (
   ID_PRZEDMIOTY        SERIAL               not null,
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
/* Index: RELATIONSHIP_6_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_6_FK on PRZEDMIOTY (
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Table: RELATIONSHIP_2                                        */
/*==============================================================*/
create table RELATIONSHIP_2 (
   ID_STUDENT           INT4                 not null,
   ID_PLANY_KSZTALCENIA INT4                 not null,
   constraint PK_RELATIONSHIP_2 primary key (ID_STUDENT, ID_PLANY_KSZTALCENIA)
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_PK                                     */
/*==============================================================*/
create unique index RELATIONSHIP_2_PK on RELATIONSHIP_2 (
ID_STUDENT,
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Index: RELATIONSHIP_2_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_2_FK on RELATIONSHIP_2 (
ID_STUDENT
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_3_FK on RELATIONSHIP_2 (
ID_PLANY_KSZTALCENIA
);

/*==============================================================*/
/* Table: RELATIONSHIP_3                                        */
/*==============================================================*/
create table RELATIONSHIP_3 (
   ID_WYKLADOWCA        INT4                 not null,
   ID_KIERUNEK          INT4                 not null,
   constraint PK_RELATIONSHIP_3 primary key (ID_WYKLADOWCA, ID_KIERUNEK)
);

/*==============================================================*/
/* Index: RELATIONSHIP_3_PK                                     */
/*==============================================================*/
create unique index RELATIONSHIP_3_PK on RELATIONSHIP_3 (
ID_WYKLADOWCA,
ID_KIERUNEK
);

/*==============================================================*/
/* Index: RELATIONSHIP_4_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_4_FK on RELATIONSHIP_3 (
ID_WYKLADOWCA
);

/*==============================================================*/
/* Index: RELATIONSHIP_5_FK                                     */
/*==============================================================*/
create  index RELATIONSHIP_5_FK on RELATIONSHIP_3 (
ID_KIERUNEK
);

/*==============================================================*/
/* Table: STUDENT                                               */
/*==============================================================*/
create table STUDENT (
   ID_STUDENT           SERIAL               not null,
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

alter table PLANY_KSZTALCENIA
   add constraint FK_PLANY_KS_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on delete restrict on update restrict;

alter table PRZEDMIOTY
   add constraint FK_PRZEDMIO_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on delete restrict on update restrict;

alter table RELATIONSHIP_2
   add constraint FK_RELATION_RELATIONS_STUDENT foreign key (ID_STUDENT)
      references STUDENT (ID_STUDENT)
      on delete restrict on update restrict;

alter table RELATIONSHIP_2
   add constraint FK_RELATION_RELATIONS_PLANY_KS foreign key (ID_PLANY_KSZTALCENIA)
      references PLANY_KSZTALCENIA (ID_PLANY_KSZTALCENIA)
      on delete restrict on update restrict;

alter table RELATIONSHIP_3
   add constraint FK_RELATION_RELATIONS_WYKLADOW foreign key (ID_WYKLADOWCA)
      references WYKLADOWCY (ID_WYKLADOWCA)
      on delete restrict on update restrict;

alter table RELATIONSHIP_3
   add constraint FK_RELATION_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on delete restrict on update restrict;

alter table STUDENT
   add constraint FK_STUDENT_RELATIONS_KIERUNEK foreign key (ID_KIERUNEK)
      references KIERUNEK (ID_KIERUNEK)
      on delete restrict on update restrict;

