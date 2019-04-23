using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.DatabaseModels
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Globalmessages> Globalmessages { get; set; }
        public virtual DbSet<Globalmessagestypes> Globalmessagestypes { get; set; }
        public virtual DbSet<Messages> Messages { get; set; }
        public virtual DbSet<Passwords> Passwords { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<Studyfields> Studyfields { get; set; }
        public virtual DbSet<Thesis> Thesis { get; set; }
        public virtual DbSet<ThesisComments> ThesisComments { get; set; }
        public virtual DbSet<ThesisStates> ThesisStates { get; set; }
        public virtual DbSet<Userdetails> Userdetails { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("Server=localhost;Database=data;user=root;password=root");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Globalmessages>(entity =>
            {
                entity.ToTable("globalmessages");

                entity.HasIndex(e => e.SenderId)
                    .HasName("FK_globalmessages_users");

                entity.HasIndex(e => e.TypeId)
                    .HasName("FK_globalmessages_globalmessagestypes");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Header)
                    .IsRequired()
                    .HasColumnName("header")
                    .HasColumnType("tinytext");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasColumnType("text");

                entity.Property(e => e.SenderId)
                    .HasColumnName("sender_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TypeId)
                    .IsRequired()
                    .HasColumnName("type_id")
                    .HasColumnType("char(4)");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.Globalmessages)
                    .HasForeignKey(d => d.SenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_globalmessages_users");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Globalmessages)
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("FK_globalmessages_globalmessagestypes");
            });

            modelBuilder.Entity<Globalmessagestypes>(entity =>
            {
                entity.ToTable("globalmessagestypes");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("char(4)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("tinytext");
            });

            modelBuilder.Entity<Messages>(entity =>
            {
                entity.ToTable("messages");

                entity.HasIndex(e => e.ReciverId)
                    .HasName("FK_messages_users_reciver");

                entity.HasIndex(e => e.SenderId)
                    .HasName("FK_messages_users_sender");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasColumnType("text");

                entity.Property(e => e.ReciverId)
                    .HasColumnName("reciver_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.SenderId)
                    .HasColumnName("sender_id")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.Reciver)
                    .WithMany(p => p.MessagesReciver)
                    .HasForeignKey(d => d.ReciverId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_messages_users_reciver");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.MessagesSender)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("FK_messages_users_sender");
            });

            modelBuilder.Entity<Passwords>(entity =>
            {
                entity.HasKey(e => e.SafetySalt);

                entity.ToTable("passwords");

                entity.HasIndex(e => e.SafetySalt)
                    .HasName("safetySalt")
                    .IsUnique();

                entity.HasIndex(e => e.SensitivePassword)
                    .HasName("sensitivePassword")
                    .IsUnique();

                entity.Property(e => e.SafetySalt)
                    .HasColumnName("safetySalt")
                    .HasColumnType("char(64)");

                entity.Property(e => e.SensitivePassword)
                    .IsRequired()
                    .HasColumnName("sensitivePassword")
                    .HasColumnType("varchar(256)");

                entity.HasOne(d => d.SafetySaltNavigation)
                    .WithOne(p => p.Passwords)
                    .HasPrincipalKey<Users>(p => p.SafetySalt)
                    .HasForeignKey<Passwords>(d => d.SafetySalt)
                    .HasConstraintName("safetySalt");
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.Name)
                    .HasName("name")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("char(3)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(128)");
            });

            modelBuilder.Entity<Studyfields>(entity =>
            {
                entity.ToTable("studyfields");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("char(50)");

                entity.Property(e => e.Faculty)
                    .IsRequired()
                    .HasColumnName("faculty")
                    .HasColumnType("char(50)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("char(128)");
            });

            modelBuilder.Entity<Thesis>(entity =>
            {
                entity.HasKey(e => e.GraduateId);

                entity.ToTable("thesis");

                entity.HasIndex(e => e.PromoterId)
                    .HasName("FK_thesis_users_2");

                entity.HasIndex(e => e.StateId)
                    .HasName("FK_thesis_thesis_states");

                entity.Property(e => e.GraduateId)
                    .HasColumnName("graduate_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DefenseGrade)
                    .HasColumnName("defense_grade")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.FinalGrade).HasColumnName("final_grade");

                entity.Property(e => e.GraduateFile)
                    .HasColumnName("graduate_file")
                    .HasColumnType("char(1)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.LastAction)
                    .HasColumnName("last_action")
                    .HasColumnType("datetime");

                entity.Property(e => e.PromoterFile)
                    .HasColumnName("promoter_file")
                    .HasColumnType("char(1)")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.PromoterId)
                    .HasColumnName("promoter_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.StateId)
                    .IsRequired()
                    .HasColumnName("state_id")
                    .HasColumnType("char(3)");

                entity.Property(e => e.StudyGrade)
                    .HasColumnName("study_grade")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ThesisGrade)
                    .HasColumnName("thesis_grade")
                    .HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Graduate)
                    .WithOne(p => p.ThesisGraduate)
                    .HasForeignKey<Thesis>(d => d.GraduateId)
                    .HasConstraintName("FK_thesis_users");

                entity.HasOne(d => d.Promoter)
                    .WithMany(p => p.ThesisPromoter)
                    .HasForeignKey(d => d.PromoterId)
                    .HasConstraintName("FK_thesis_users_2");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Thesis)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("FK_thesis_thesis_states");
            });

            modelBuilder.Entity<ThesisComments>(entity =>
            {
                entity.ToTable("thesis_comments");

                entity.HasIndex(e => e.GraduateId)
                    .HasName("FK_thesis_comments_thesis");

                entity.HasIndex(e => e.SenderId)
                    .HasName("FK_thesis_comments_users");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("datetime");

                entity.Property(e => e.GraduateId)
                    .HasColumnName("graduate_id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Message)
                    .IsRequired()
                    .HasColumnName("message")
                    .HasColumnType("text");

                entity.Property(e => e.SenderId)
                    .HasColumnName("sender_id")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.Graduate)
                    .WithMany(p => p.ThesisComments)
                    .HasForeignKey(d => d.GraduateId)
                    .HasConstraintName("FK_thesis_comments_thesis");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.ThesisComments)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("FK_thesis_comments_users");
            });

            modelBuilder.Entity<ThesisStates>(entity =>
            {
                entity.ToTable("thesis_states");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("char(3)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("tinytext");
            });

            modelBuilder.Entity<Userdetails>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("userdetails");

                entity.HasIndex(e => e.PromoterId)
                    .HasName("FK_userdetails_promoter");

                entity.HasIndex(e => e.Role)
                    .HasName("FK_userdetails_roles");

                entity.HasIndex(e => e.StudyFieldId)
                    .HasName("FK_userdetails_studyfields");

                entity.Property(e => e.UserId)
                    .HasColumnName("userId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.EngineerWork)
                    .HasColumnName("engineerWork")
                    .HasColumnType("varchar(128)");

                entity.Property(e => e.LastName)
                    .HasColumnName("lastName")
                    .HasColumnType("varchar(128)");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(128)");

                entity.Property(e => e.PromoterId)
                    .HasColumnName("promoterId")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasColumnName("role")
                    .HasColumnType("char(3)");

                entity.Property(e => e.StudyFieldId)
                    .HasColumnName("studyFieldId")
                    .HasColumnType("char(50)");

                entity.HasOne(d => d.Promoter)
                    .WithMany(p => p.UserdetailsPromoter)
                    .HasForeignKey(d => d.PromoterId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_userdetails_promoter");

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.Userdetails)
                    .HasForeignKey(d => d.Role)
                    .HasConstraintName("FK_userdetails_roles");

                entity.HasOne(d => d.StudyField)
                    .WithMany(p => p.Userdetails)
                    .HasForeignKey(d => d.StudyFieldId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_userdetails_studyfields");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserdetailsUser)
                    .HasForeignKey<Userdetails>(d => d.UserId)
                    .HasConstraintName("FK_userdetails_user");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email)
                    .HasName("login")
                    .IsUnique();

                entity.HasIndex(e => e.SafetySalt)
                    .HasName("safetySalt")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(256)");

                entity.Property(e => e.SafetySalt)
                    .IsRequired()
                    .HasColumnName("safetySalt")
                    .HasColumnType("char(64)");
            });
        }
    }
}
