﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PrestationApi.Models;

namespace PrestationApi.Migrations
{
    [DbContext(typeof(PrestationDbContext))]
    [Migration("20181222173101_Alter-CodeChantier-Info")]
    partial class AlterCodeChantierInfo
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.3-rtm-32065");

            modelBuilder.Entity("PrestationApi.Models.CodeChantier", b =>
                {
                    b.Property<string>("Code")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Client");

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Description");

                    b.Property<string>("Produit");

                    b.HasKey("Code");

                    b.ToTable("CodesChantier");
                });

            modelBuilder.Entity("PrestationApi.Models.Prestation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CodeChantierId");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<int>("Duration");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CodeChantierId");

                    b.HasIndex("UserId");

                    b.ToTable("Prestations");
                });

            modelBuilder.Entity("PrestationApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PrestationApi.Models.Prestation", b =>
                {
                    b.HasOne("PrestationApi.Models.CodeChantier", "CodeChantier")
                        .WithMany()
                        .HasForeignKey("CodeChantierId");

                    b.HasOne("PrestationApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
