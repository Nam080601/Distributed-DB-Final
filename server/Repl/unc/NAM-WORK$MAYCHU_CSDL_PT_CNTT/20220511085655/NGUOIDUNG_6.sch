drop Table [dbo].[NGUOIDUNG]
go
SET ANSI_PADDING OFF
go

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NGUOIDUNG](
	[USERNAME] [nvarchar](10) NOT NULL,
	[PASSWORD] [nvarchar](100) NULL,
	[HOTEN] [nvarchar](50) NULL,
	[KHOA] [nvarchar](10) NULL,
	[VAITRO] [nvarchar](10) NULL,
	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL
)

GO
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [MSmerge_df_rowguid_642AB90E6C6F446DB8FFF801C37C03EA]  DEFAULT (newsequentialid()) FOR [rowguid]
GO
SET ANSI_NULLS ON

go

SET QUOTED_IDENTIFIER ON

go

SET ANSI_PADDING ON

GO
ALTER TABLE [dbo].[NGUOIDUNG] ADD  CONSTRAINT [PK__NGUOIDUN__B15BE12F3849931E] PRIMARY KEY CLUSTERED 
(
	[USERNAME] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
GO
