CREATE DATABASE CSDL_PT
USE CSDL_PT
GO

CREATE TABLE KHOA
(
	MAKHOA NVARCHAR(10) NOT NULL PRIMARY KEY,
	TENKHOA NVARCHAR(50) NOT NULL
)

CREATE TABLE DIEM
(
	MSSV NVARCHAR(10) NOT NULL,
	HOTEN NVARCHAR(50) NOT NULL,
	KHOA NVARCHAR(10) NOT NULL,
	MON NVARCHAR(10) NOT NULL,
	DQT FLOAT,
	DGK FLOAT,
	DCK FLOAT,
	DTB FLOAT,
	PRIMARY KEY (MSSV, KHOA, MON)
)

CREATE TABLE SINHVIEN
(
	MSSV NVARCHAR(10) NOT NULL PRIMARY KEY,
	HOTEN NVARCHAR(50) NOT NULL,
	KHOA NVARCHAR(10) NOT NULL
)

CREATE TABLE MONHOC
(
	MAMON NVARCHAR(10) NOT NULL PRIMARY KEY,
	TENMON NVARCHAR(50) NOT NULL,
	KHOA NVARCHAR(10) NOT NULL
)

CREATE TABLE VAITRO
(
	VAITRO NVARCHAR(10) PRIMARY KEY
)

CREATE TABLE NGUOIDUNG
(
	USERNAME NVARCHAR(10) PRIMARY KEY,
	PASSWORD NVARCHAR(100),
	HOTEN NVARCHAR(50),
	KHOA NVARCHAR(10),
	VAITRO NVARCHAR(10)
)

-- DROP TABLE KHOA,SINHVIEN,DIEM,MONHOC,NGUOIDUNG

ALTER TABLE DIEM
ADD	CONSTRAINT FK_MSSV_DIEM FOREIGN KEY (MSSV) REFERENCES SINHVIEN(MSSV),
	CONSTRAINT FK_KHOA_DIEM FOREIGN KEY (KHOA) REFERENCES KHOA(MAKHOA),
	CONSTRAINT FK_MON_DIEM FOREIGN KEY (MON) REFERENCES MONHOC(MAMON)

ALTER TABLE SINHVIEN
ADD	CONSTRAINT FK_KHOA_SINHVIEN FOREIGN KEY (KHOA) REFERENCES KHOA(MAKHOA)

ALTER TABLE MONHOC
ADD	CONSTRAINT FK_KHOA_MONHOC FOREIGN KEY (KHOA) REFERENCES KHOA(MAKHOA)

ALTER TABLE NGUOIDUNG
ADD CONSTRAINT FK_KHOA_NGUOIDUNG FOREIGN KEY (KHOA) REFERENCES KHOA(MAKHOA),
    CONSTRAINT FK_VAITRO_NGUOIDUNG FOREIGN KEY (VAITRO) REFERENCES VAITRO(VAITRO)

CREATE TRIGGER DTB
ON DIEM
AFTER INSERT, UPDATE
AS 
BEGIN
	DECLARE @DTB FLOAT = (SELECT ROUND((DQT + DGK + DCK) / 3, 1) FROM INSERTED), @MSSV NVARCHAR(10) = (SELECT MSSV FROM INSERTED)
    UPDATE DIEM
    SET DTB = @DTB
	WHERE MSSV = @MSSV
END

INSERT INTO KHOA VALUES
('CNTT', N'Công Nghệ Thông Tin'),
('NN', N'Ngoại Ngữ')

INSERT INTO MONHOC VALUES
('WEB1', N'Lập Trình Web', N'CNTT'),
('WRITE1', N'Viết 1', N'NN')

INSERT INTO SINHVIEN VALUES
('CNTT001', N'Lê Tuấn Anh', N'CNTT'),
('CNTT002', N'Nguyễn Mạnh Hải', N'CNTT'),
('CNTT003', N'Đinh Đình Đẳng', N'CNTT'),
('CNTT004', N'Võ Thành Phát', N'CNTT'),
('CNTT005', N'Trần Thanh Minh', N'CNTT'),
('CNTT006', N'Lê Minh Thành', N'CNTT'),
('CNTT007', N'Nguyễn Hải Anh', N'CNTT'),
('NN001', N'Nguyễn Ngọc Phụng', N'NN'),
('NN002', N'Lê Trâm Anh', N'NN'),
('NN003', N'Vũ Xuân Ngọc', N'NN'),
('NN004', N'Trần Minh', N'NN'),
('NN005', N'Đặng Lê Nguyên Vũ', N'NN'),
('NN006', N'Trà Xuân Mai', N'NN'),
('NN007', N'Đinh Phước Thành', N'NN'),


INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT001', N'Lê Tuấn Anh', N'CNTT', N'WEB1', 9,8,8)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT002', N'Nguyễn Mạnh Hải', N'CNTT', N'WEB1', 7,6,9)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT003', N'Đinh Đình Đẳng', N'CNTT', N'WEB1', 8,7,6)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT004', N'Võ Thành Phát', N'CNTT', N'WEB1', 9,9,8)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT005', N'Trần Thanh Minh', N'CNTT', N'WEB1', 10,9,7.5)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT006', N'Lê Minh Thành', N'CNTT', N'WEB1', 8,8,8.5)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('CNTT007', N'Nguyễn Hải Anh', N'CNTT', N'WEB1', 7,8,8)

INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN001', N'Nguyễn Ngọc Phụng', N'NN', N'WRITE1', 9,6,8)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN002', N'Lê Trâm Anh', N'NN', N'WRITE1', 5,7,6)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN003', N'Vũ Xuân Ngọc', N'NN', N'WRITE1', 7,7,7)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN004', N'Trần Minh', N'NN', N'WRITE1', 9,9,8)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN005', N'Đặng Lê Nguyên Vũ', N'NN', N'WRITE1', 9,7.5,9.5)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN006', N'Trà Xuân Mai', N'NN', N'WRITE1', 7,8,10)
INSERT INTO DIEM(MSSV,HOTEN,KHOA,MON,DQT,DGK,DCK) VALUES
('NN007', N'Đinh Phước Thành', N'NN', N'WRITE1', 5,5,7)

INSERT INTO VAITRO VALUES
('GIAOVU'), ('TRUONGKHOA'), ('GIANGVIEN')

INSERT INTO NGUOIDUNG VALUES 
('gv_cntt', '$2a$10$suEOxpilT.35YL2Iu/xQ3ejOvVU5jUY8XPXR179eU3btkT0eB8Zfm', N'Trần Văn Cường', 'CNTT', 'GIAOVU'),
('tk_cntt', '$2a$10$fz/xTzmUVUgtNE3GW4psvO6QyuyxvKGYyHE9SQVW8KqgnF1T4kRvG', N'Lê Văn Bình', 'CNTT', 'TRUONGKHOA'),
('gv_cntt_1', '$2a$10$UXF3eS7ZulRaFGiKUugXhe.S6.cR5CtWa2JFMUD9v/LuQBkc8AvCS', N'Dương Thị Dung', 'CNTT', 'GIANGVIEN'),
('gv_nn', '$2a$10$yUiGy35mRmTvMqXrA18uIurSqyBzd7TRM5XLsNi/kJX8O/E.sStWK', N'Lê Thành Công', 'NN', 'GIAOVU'),
('tk_nn', '$2a$10$PVvNiYaSaiturqdXmZPENuyzJq32T4irPI5NUUCJL2ZRZc2jD593O', N'Nguyễn Văn Phúc', 'NN', 'TRUONGKHOA'),
('gv_nn_2', '$2a$10$N73vCmz2HOHc9dc/pS.CAeJkv4GT2MKn6ckZnpzpI.ozFF9jgQZTm', N'Mai Văn Sơn', 'NN', 'GIANGVIEN')