USE [bsl]
GO
/****** Object:  Table [dbo].[BRANCH]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH](
	[ID] [nvarchar](50) NOT NULL,
	[BUSINESS_ID] [nvarchar](50) NOT NULL,
	[BRANCH_NAME] [nvarchar](50) NOT NULL,
	[OFFICE_ADDRESS] [nvarchar](300) NULL,
	[CONTACT_NAME] [nvarchar](50) NULL,
	[CONTACT_NO] [nvarchar](50) NULL,
	[EMAIL_ADDRESS] [nvarchar](50) NULL,
	[START_DATE] [date] NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [date] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_BRANCH] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BRANCH_PRODUCTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH_PRODUCTS](
	[BRANCH_ID] [nvarchar](50) NOT NULL,
	[PRODUCT_ID] [nvarchar](50) NOT NULL,
	[UNIT_PRICE] [decimal](10, 2) NOT NULL,
	[STOCK_QTY] [decimal](10, 2) NOT NULL,
	[REORDER_LEVEL] [int] NOT NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [datetime] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_BRANCH_PRODUCTS_1] PRIMARY KEY CLUSTERED 
(
	[BRANCH_ID] ASC,
	[PRODUCT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BRAND]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRAND](
	[ID] [nvarchar](50) NOT NULL,
	[BRAND_NAME] [nvarchar](50) NOT NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [date] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_BRAND] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BUSINESS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BUSINESS](
	[ID] [nvarchar](50) NOT NULL,
	[BUSINESS_NAME] [nvarchar](50) NOT NULL,
	[OFFICE_ADDRESS] [nvarchar](300) NULL,
	[CONTACT_NAME] [nvarchar](50) NULL,
	[CONTACT_NO] [nvarchar](50) NULL,
	[EMAIL_ADDRESS] [nvarchar](50) NULL,
	[BIN] [nvarchar](50) NULL,
	[CURRENCY_ID] [nvarchar](50) NULL,
	[START_DATE] [date] NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [datetime] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_BUSINESS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CATEGORY]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CATEGORY](
	[ID] [nvarchar](50) NOT NULL,
	[CATEGORY_NAME] [nvarchar](50) NOT NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [date] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_CATEGORY] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CONTACTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CONTACTS](
	[ID] [nvarchar](50) NOT NULL,
	[CONTACT_TYPE] [nvarchar](50) NOT NULL,
	[CATEGORY_ID] [nvarchar](50) NOT NULL,
	[CONTACT_NAME] [nvarchar](150) NOT NULL,
	[CONTACT_PERSON] [nvarchar](50) NOT NULL,
	[CONTACT_NO] [nvarchar](50) NULL,
	[EMAIL_ADDRESS] [nvarchar](50) NULL,
	[OFFICE_ADDRESS] [nvarchar](50) NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [datetime] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_CONTACTS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PRODUCTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PRODUCTS](
	[ID] [nvarchar](50) NOT NULL,
	[BAR_CODE] [nvarchar](50) NULL,
	[PRODUCT_NAME] [nvarchar](150) NOT NULL,
	[UNIT_ID] [nvarchar](50) NOT NULL,
	[CATEGORY_ID] [nvarchar](50) NOT NULL,
	[BRAND_ID] [nvarchar](50) NOT NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [datetime] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_PRODUCTS] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UNIT]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UNIT](
	[ID] [nvarchar](50) NOT NULL,
	[UNIT_NAME] [nvarchar](50) NOT NULL,
	[UNIT_ID] [nvarchar](50) NULL,
	[RELATIVE_FACTOR] [int] NULL,
	[IS_ACTIVE] [bit] NULL,
	[CREATE_USER] [nvarchar](50) NULL,
	[CREATE_DATE] [datetime] NULL,
	[UPDATE_USER] [nvarchar](50) NULL,
	[UPDATE_DATE] [date] NULL,
	[REVISE_NO] [int] NULL,
 CONSTRAINT [PK_UNIT] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BRANCH] ADD  CONSTRAINT [DF_BRANCH_START_DATE]  DEFAULT (getdate()) FOR [START_DATE]
GO
ALTER TABLE [dbo].[BRANCH] ADD  CONSTRAINT [DF_BRANCH_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[BRANCH] ADD  CONSTRAINT [DF_BRANCH_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[BRANCH] ADD  CONSTRAINT [DF_BRANCH_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[BRANCH] ADD  CONSTRAINT [DF_BRANCH_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_PRODUCTS_UNIT_PRICE]  DEFAULT ((0)) FOR [UNIT_PRICE]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_STOCK_QTY]  DEFAULT ((0)) FOR [STOCK_QTY]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_REORDER]  DEFAULT ((0)) FOR [REORDER_LEVEL]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_PRODUCTS_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_PRODUCTS_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_PRODUCTS_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[BRANCH_PRODUCTS] ADD  CONSTRAINT [DF_BRANCH_PRODUCTS_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[BRAND] ADD  CONSTRAINT [DF_BRAND_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[BRAND] ADD  CONSTRAINT [DF_BRAND_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[BRAND] ADD  CONSTRAINT [DF_BRAND_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[BRAND] ADD  CONSTRAINT [DF_BRAND_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[BUSINESS] ADD  CONSTRAINT [DF_BUSINESS_START_DATE]  DEFAULT (getdate()) FOR [START_DATE]
GO
ALTER TABLE [dbo].[BUSINESS] ADD  CONSTRAINT [DF_BUSINESS_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[BUSINESS] ADD  CONSTRAINT [DF_BUSINESS_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[BUSINESS] ADD  CONSTRAINT [DF_BUSINESS_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[BUSINESS] ADD  CONSTRAINT [DF_BUSINESS_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[CATEGORY] ADD  CONSTRAINT [DF_CATEGORY_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[CATEGORY] ADD  CONSTRAINT [DF_CATEGORY_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[CATEGORY] ADD  CONSTRAINT [DF_CATEGORY_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[CATEGORY] ADD  CONSTRAINT [DF_CATEGORY_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[CONTACTS] ADD  CONSTRAINT [DF_CONTACTS_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[CONTACTS] ADD  CONSTRAINT [DF_CONTACTS_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[CONTACTS] ADD  CONSTRAINT [DF_CONTACTS_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[CONTACTS] ADD  CONSTRAINT [DF_CONTACTS_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[PRODUCTS] ADD  CONSTRAINT [DF__PRODUCTS__IS_ACT__6383C8BA]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[PRODUCTS] ADD  CONSTRAINT [DF_PRODUCTS_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[PRODUCTS] ADD  CONSTRAINT [DF_PRODUCTS_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[PRODUCTS] ADD  CONSTRAINT [DF__PRODUCTS__REVISE__6477ECF3]  DEFAULT ((0)) FOR [REVISE_NO]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF__UNIT__UNIT_ID__5BE2A6F2]  DEFAULT ('0') FOR [UNIT_ID]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF__UNIT__RELATIVE_F__5CD6CB2B]  DEFAULT ((1)) FOR [RELATIVE_FACTOR]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF_UNIT_IS_ACTIVE]  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF_UNIT_CREATE_DATE]  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF_UNIT_UPDATE_DATE]  DEFAULT (getdate()) FOR [UPDATE_DATE]
GO
ALTER TABLE [dbo].[UNIT] ADD  CONSTRAINT [DF_UNIT_REVISE_NO]  DEFAULT ((0)) FOR [REVISE_NO]
GO
/****** Object:  StoredProcedure [dbo].[SP_BRANCH]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_BRANCH]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @BusinessId NVARCHAR(50) = NULL,
    @BranchName NVARCHAR(50) = NULL,
    @OfficeAddress NVARCHAR(300) = NULL,
    @ContactName NVARCHAR(50) = NULL,
    @ContactNo NVARCHAR(50) = NULL,
	@EmailAddress NVARCHAR(50) = NULL,
    @StartDate DATE = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
			IF EXISTS (SELECT 1 FROM BRANCH WHERE BRANCH_NAME = @BranchName AND BUSINESS_ID = @BusinessId)
			BEGIN
				SET @P_SUCCESS = 0;
				SET @P_MSG = 'Branch name already exists for the specified business.';
				RETURN;
			END

            SET @Id = NEWID();

            INSERT INTO BRANCH (
                ID, BUSINESS_ID, BRANCH_NAME, OFFICE_ADDRESS, CONTACT_NAME, CONTACT_NO,
                EMAIL_ADDRESS, START_DATE, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @BusinessId, @BranchName, @OfficeAddress, @ContactName, @ContactNo,
                @EmailAddress, @StartDate, 1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN

			IF EXISTS (SELECT 1 FROM BRANCH WHERE BRANCH_NAME = @BranchName AND BUSINESS_ID = @BusinessId AND ID != @Id)
			BEGIN
				SET @P_SUCCESS = 0;
				SET @P_MSG = 'Branch name already exists for the specified business.';
				RETURN;
			END


            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE BRANCH
            SET 
                BUSINESS_ID = @BusinessId,
                BRANCH_NAME = @BranchName,
                OFFICE_ADDRESS = @OfficeAddress,
                CONTACT_NAME = @ContactName,
                CONTACT_NO = @ContactNo,
				EMAIL_ADDRESS = @EmailAddress,
                START_DATE = @StartDate,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM BRANCH
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id, BUSINESS_ID BusinessId, BRANCH_NAME BranchName, OFFICE_ADDRESS OfficeAddress, 
                CONTACT_NAME ContactName, CONTACT_NO ContactNo, EMAIL_ADDRESS EmailAddress, START_DATE StartDate, 
                IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM BRANCH
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT br.ID Id, br.BUSINESS_ID BusinessId, bs.BUSINESS_NAME BusinessName, br.BRANCH_NAME BranchName, br.OFFICE_ADDRESS OfficeAddress, 
                br.CONTACT_NAME ContactName, br.CONTACT_NO ContactNo, br.EMAIL_ADDRESS EmailAddress, br.START_DATE StartDate, 
                br.IS_ACTIVE IsActive, br.REVISE_NO ReviseNo
            FROM BRANCH br
			LEFT JOIN BUSINESS bs on br.BUSINESS_ID = bs.ID;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_BRANCH_PRODUCTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_BRANCH_PRODUCTS]
    @Action NVARCHAR(50),
    @BranchId NVARCHAR(50) = NULL,
    @ProductId NVARCHAR(50) = NULL,
    @UnitPrice DECIMAL(10, 2) = NULL,
    @StockQty DECIMAL(10, 2) = NULL,
    @ReorderLevel INT = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY	
        IF @Action = 'INSERTALL'
        BEGIN
            -- Check if the record already exists
            DELETE BRANCH_PRODUCTS WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId AND STOCK_QTY <= 0;

            INSERT INTO BRANCH_PRODUCTS (
                BRANCH_ID, PRODUCT_ID, UNIT_PRICE, STOCK_QTY, REORDER_LEVEL, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @BranchId, @ProductId, @UnitPrice, 0, @ReorderLevel, @IsActive, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'INSERT'
        BEGIN
            -- Check if the record already exists
            IF EXISTS (SELECT 1 FROM BRANCH_PRODUCTS WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Record already exists for this Branch and Product.';
                RETURN;
            END

            INSERT INTO BRANCH_PRODUCTS (
                BRANCH_ID, PRODUCT_ID, UNIT_PRICE, STOCK_QTY, REORDER_LEVEL, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @BranchId, @ProductId, @UnitPrice, @StockQty, @ReorderLevel, @IsActive, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            -- Check if the record exists
            IF NOT EXISTS (SELECT 1 FROM BRANCH_PRODUCTS WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update for this Branch and Product.';
                RETURN;
            END

            UPDATE BRANCH_PRODUCTS
            SET 
                UNIT_PRICE = @UnitPrice,
                STOCK_QTY = @StockQty,
                REORDER_LEVEL = @ReorderLevel,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId;

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Update successful.';
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            -- Check if the record exists
            IF NOT EXISTS (SELECT 1 FROM BRANCH_PRODUCTS WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete for this Branch and Product.';
                RETURN;
            END

            DELETE FROM BRANCH_PRODUCTS
            WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId;

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Delete successful.';
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @BranchId IS NULL OR @ProductId IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'BranchId and ProductId are required for GETBYID.';
                RETURN;
            END

            SELECT BRANCH_ID BranchId, PRODUCT_ID ProductId, UNIT_PRICE UnitPrice, STOCK_QTY StockQty, 
                   REORDER_LEVEL ReorderLevel, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM BRANCH_PRODUCTS
            WHERE BRANCH_ID = @BranchId AND PRODUCT_ID = @ProductId;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found for the specified Branch and Product.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
             SELECT BRANCH_ID BranchId, PRODUCT_ID ProductId, UNIT_PRICE UnitPrice, STOCK_QTY StockQty, 
                   REORDER_LEVEL ReorderLevel, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM BRANCH_PRODUCTS;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETBYPRODUCTID'
        BEGIN

			SELECT B.ID BranchId,B.BRANCH_NAME BranchName,@ProductId ProductId, ISNULL(BP.UNIT_PRICE,0) UnitPrice, ISNULL(BP.STOCK_QTY,0) StockQty, 
			ISNULL(BP.REORDER_LEVEL,0) ReorderLevel,ISNULL(BP.IS_ACTIVE,0)IsActive,BP.REVISE_NO ReviseNo
			FROM BRANCH B
			LEFT JOIN BRANCH_PRODUCTS BP ON B.ID=BP.BRANCH_ID
			AND BP.PRODUCT_ID = @ProductId;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_BRAND]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[SP_BRAND]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @BrandName NVARCHAR(50) = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
            -- Check if the BRAND name already exists
            IF EXISTS (SELECT 1 FROM BRAND WHERE BRAND_NAME = @BrandName)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Brand Name already exists.';
                RETURN;
            END

            SET @Id = NEWID();

            INSERT INTO BRAND (
                ID, BRAND_NAME, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @BrandName, 1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            -- Check if the BRAND name already exists (excluding the current record)
            IF EXISTS (SELECT 1 FROM BRAND WHERE BRAND_NAME = @BrandName AND ID <> @Id)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Brand Name already exists.';
                RETURN;
            END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE BRAND
            SET 
                BRAND_NAME = @BrandName,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM BRAND
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id, BRAND_NAME BrandName, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM BRAND
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT ID Id, BRAND_NAME BrandName, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM BRAND;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_BUSINESS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_BUSINESS]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @BusinessName NVARCHAR(50) = NULL,
    @OfficeAddress NVARCHAR(300) = NULL,
    @ContactName NVARCHAR(50) = NULL,
    @ContactNo NVARCHAR(50) = NULL,
    @EmailAddress NVARCHAR(50) = NULL,
    @BIN NVARCHAR(50) = NULL,
    @CurrencyId NVARCHAR(50) = NULL,
    @StartDate DATE = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
			IF EXISTS (SELECT 1 FROM BUSINESS WHERE BUSINESS_NAME = @BusinessName)
			BEGIN
				SET @P_SUCCESS = 0;
				SET @P_MSG = 'Business Name already exists.';
				RETURN;
			END

            SET @Id = NEWID();

            INSERT INTO BUSINESS (
                ID, BUSINESS_NAME, OFFICE_ADDRESS, CONTACT_NAME, CONTACT_NO,
                EMAIL_ADDRESS, BIN, CURRENCY_ID, START_DATE,
                IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @BusinessName, @OfficeAddress, @ContactName, @ContactNo,
                @EmailAddress, @BIN, @CurrencyId, @StartDate,
                1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
			IF EXISTS (SELECT 1 FROM BUSINESS WHERE BUSINESS_NAME = @BusinessName AND ID <> @Id)
			BEGIN
				SET @P_SUCCESS = 0;
				SET @P_MSG = 'Business Name already exists.';
				RETURN;
			END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE BUSINESS
            SET 
                BUSINESS_NAME = @BusinessName,
                OFFICE_ADDRESS = @OfficeAddress,
                CONTACT_NAME = @ContactName,
                CONTACT_NO = @ContactNo,
                EMAIL_ADDRESS = @EmailAddress,
                BIN = @BIN,
                CURRENCY_ID = @CurrencyId,
                START_DATE = @StartDate,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM BUSINESS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id,BUSINESS_NAME BusinessName,OFFICE_ADDRESS OfficeAddress,CONTACT_NAME ContactName,CONTACT_NO ContactNo,
			EMAIL_ADDRESS EmailAddress,BIN BIN,CURRENCY_ID CurrencyId,START_DATE StartDate,IS_ACTIVE IsActive,REVISE_NO ReviseNo
            FROM BUSINESS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT ID Id,BUSINESS_NAME BusinessName,OFFICE_ADDRESS OfficeAddress,CONTACT_NAME ContactName,CONTACT_NO ContactNo,
			EMAIL_ADDRESS EmailAddress,BIN BIN,CURRENCY_ID CurrencyId,START_DATE StartDate,IS_ACTIVE IsActive,REVISE_NO ReviseNo
            FROM BUSINESS;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CATEGORY]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CATEGORY]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @CategoryName NVARCHAR(50) = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
            -- Check if the category name already exists
            IF EXISTS (SELECT 1 FROM CATEGORY WHERE CATEGORY_NAME = @CategoryName)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Category Name already exists.';
                RETURN;
            END

            SET @Id = NEWID();

            INSERT INTO CATEGORY (
                ID, CATEGORY_NAME, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @CategoryName, 1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            -- Check if the category name already exists (excluding the current record)
            IF EXISTS (SELECT 1 FROM CATEGORY WHERE CATEGORY_NAME = @CategoryName AND ID <> @Id)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Category Name already exists.';
                RETURN;
            END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE CATEGORY
            SET 
                CATEGORY_NAME = @CategoryName,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM CATEGORY
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id, CATEGORY_NAME CategoryName, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM CATEGORY
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT ID Id, CATEGORY_NAME CategoryName, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM CATEGORY;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CONTACTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CONTACTS]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @ContactType NVARCHAR(50) = NULL,
    @CategoryId NVARCHAR(50) = NULL,
    @ContactName NVARCHAR(150) = NULL,
    @ContactPerson NVARCHAR(50) = NULL,
    @ContactNo NVARCHAR(50) = NULL,
    @EmailAddress NVARCHAR(50) = NULL,
    @OfficeAddress NVARCHAR(50) = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
            -- Check if the contact name already exists
            IF EXISTS (SELECT 1 FROM CONTACTS WHERE CONTACT_NAME = @ContactName AND CATEGORY_ID = @CategoryId)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Contact Name already exists for the given category.';
                RETURN;
            END

            SET @Id = NEWID();

            INSERT INTO CONTACTS (
                ID, CONTACT_TYPE, CATEGORY_ID, CONTACT_NAME, CONTACT_PERSON, CONTACT_NO, 
                EMAIL_ADDRESS, OFFICE_ADDRESS, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @ContactType, @CategoryId, @ContactName, @ContactPerson, @ContactNo, 
                @EmailAddress, @OfficeAddress, 1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            -- Check if the contact name already exists (excluding the current record)
            IF EXISTS (SELECT 1 FROM CONTACTS WHERE CONTACT_NAME = @ContactName AND CATEGORY_ID = @CategoryId AND ID <> @Id)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Contact Name already exists for the given category.';
                RETURN;
            END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE CONTACTS
            SET 
                CONTACT_TYPE = @ContactType,
                CATEGORY_ID = @CategoryId,
                CONTACT_NAME = @ContactName,
                CONTACT_PERSON = @ContactPerson,
                CONTACT_NO = @ContactNo,
                EMAIL_ADDRESS = @EmailAddress,
                OFFICE_ADDRESS = @OfficeAddress,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM CONTACTS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id, CONTACT_TYPE ContactType, CATEGORY_ID CategoryId, CONTACT_NAME ContactName, CONTACT_PERSON ContactPerson, CONTACT_NO ContactNo, 
                   EMAIL_ADDRESS EmailAddress, OFFICE_ADDRESS OfficeAddress, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM CONTACTS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT ID Id, CONTACT_TYPE ContactType, CATEGORY_ID CategoryId, CONTACT_NAME ContactName, CONTACT_PERSON ContactPerson, CONTACT_NO ContactNo, 
                   EMAIL_ADDRESS EmailAddress, OFFICE_ADDRESS OfficeAddress, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM CONTACTS;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_PRODUCTS]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_PRODUCTS]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @BarCode NVARCHAR(50) = NULL,
    @ProductName NVARCHAR(150) = NULL,
    @UnitId NVARCHAR(50) = NULL,
    @CategoryId NVARCHAR(50) = NULL,
    @BrandId NVARCHAR(50) = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
            -- Check if the product name already exists
            IF EXISTS (SELECT 1 FROM PRODUCTS WHERE PRODUCT_NAME = @ProductName)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Product Name already exists.';
                RETURN;
            END

            SET @Id = NEWID();

            INSERT INTO PRODUCTS (
                ID, BAR_CODE, PRODUCT_NAME, UNIT_ID, CATEGORY_ID, BRAND_ID, IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @BarCode, @ProductName, @UnitId, @CategoryId, @BrandId, 1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            -- Check if the product name already exists (excluding the current record)
            IF EXISTS (SELECT 1 FROM PRODUCTS WHERE PRODUCT_NAME = @ProductName AND ID <> @Id)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Product Name already exists.';
                RETURN;
            END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE PRODUCTS
            SET 
                BAR_CODE = @BarCode,
                PRODUCT_NAME = @ProductName,
                UNIT_ID = @UnitId,
                CATEGORY_ID = @CategoryId,
                BRAND_ID = @BrandId,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM PRODUCTS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT ID Id, BAR_CODE BarCode, PRODUCT_NAME ProductName, UNIT_ID UnitId, CATEGORY_ID CategoryId, BRAND_ID BrandId, IS_ACTIVE IsActive, REVISE_NO ReviseNo
            FROM PRODUCTS
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
			SELECT P.ID AS Id,P.BAR_CODE AS BarCode,P.PRODUCT_NAME AS ProductName,P.UNIT_ID AS UnitId,U.UNIT_NAME AS UnitName,P.CATEGORY_ID AS CategoryId, 
			C.CATEGORY_NAME AS CategoryName,P.BRAND_ID AS BrandId,B.BRAND_NAME AS BrandName,P.IS_ACTIVE AS IsActive,P.REVISE_NO AS ReviseNo, ISNULL(BP.BranchCount, 0) AS BranchCount
			FROM PRODUCTS P
			JOIN UNIT U ON P.UNIT_ID = U.ID
			JOIN CATEGORY C ON P.CATEGORY_ID = C.ID
			JOIN BRAND B ON P.BRAND_ID = B.ID
			LEFT JOIN ( SELECT  PRODUCT_ID, COUNT(BRANCH_ID) AS BranchCount
					FROM  BRANCH_PRODUCTS
					GROUP BY PRODUCT_ID
				) BP ON P.ID = BP.PRODUCT_ID;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UNIT]    Script Date: 1/12/2025 6:47:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_UNIT]
    @Action NVARCHAR(50),
    @Id NVARCHAR(50) = NULL,
    @UnitName NVARCHAR(50) = NULL,
    @UnitId NVARCHAR(50) = NULL,
    @RelativeFactor INT = NULL,
    @IsActive BIT = 1,
    @UserId NVARCHAR(50) = NULL,
    @P_SUCCESS BIT OUTPUT,
    @P_MSG NVARCHAR(500) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF @Action = 'INSERT'
        BEGIN
            IF EXISTS (SELECT 1 FROM UNIT WHERE UNIT_NAME = @UnitName)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Unit Name already exists.';
                RETURN;
            END

            SET @Id = NEWID();

            INSERT INTO UNIT (
                ID, UNIT_NAME, UNIT_ID, RELATIVE_FACTOR,
                IS_ACTIVE, CREATE_USER, CREATE_DATE, REVISE_NO
            )
            VALUES (
                @Id, @UnitName, @UnitId, @RelativeFactor,
                1, @UserId, GETDATE(), 1
            );

            SET @P_SUCCESS = 1;
            SET @P_MSG = 'Insert successful.';
        END
        ELSE IF @Action = 'UPDATE'
        BEGIN
            IF EXISTS (SELECT 1 FROM UNIT WHERE UNIT_NAME = @UnitName AND ID <> @Id)
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'Unit Name already exists.';
                RETURN;
            END

            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for update.';
                RETURN;
            END

            UPDATE UNIT
            SET 
                UNIT_NAME = @UnitName,
                UNIT_ID = @UnitId,
                RELATIVE_FACTOR = @RelativeFactor,
                IS_ACTIVE = @IsActive,
                UPDATE_USER = @UserId,
                UPDATE_DATE = GETDATE(),
                REVISE_NO = REVISE_NO + 1
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to update.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Update successful.';
            END
        END
        ELSE IF @Action = 'DELETE'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for delete.';
                RETURN;
            END

            DELETE FROM UNIT
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found to delete.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Delete successful.';
            END
        END
        ELSE IF @Action = 'GETBYID'
        BEGIN
            IF @Id IS NULL
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'ID is required for get by id.';
                RETURN;
            END

            SELECT 
                ID AS Id, UNIT_NAME AS UnitName, UNIT_ID AS UnitId,
                RELATIVE_FACTOR AS RelativeFactor, IS_ACTIVE AS IsActive, REVISE_NO AS ReviseNo
            FROM UNIT
            WHERE ID = @Id;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No record found with the specified ID.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Record retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALL'
        BEGIN
            SELECT 
                U.ID AS Id, U.UNIT_NAME AS UnitName, U.UNIT_ID AS UnitId, ISNULL(UP.UNIT_NAME,'No Parent') AS ParentUnitName,
                U.RELATIVE_FACTOR AS RelativeFactor, U.IS_ACTIVE AS IsActive, U.REVISE_NO AS ReviseNo
            FROM UNIT U
			LEFT JOIN UNIT UP ON U.UNIT_ID = UP.ID
			ORDER BY U.UNIT_ID,U.UNIT_NAME;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALLCHILD'
        BEGIN
            SELECT 
                U.ID AS Id, U.UNIT_NAME AS UnitName, U.UNIT_ID AS UnitId,UP.UNIT_NAME AS ParentUnitName,
                U.RELATIVE_FACTOR AS RelativeFactor, U.IS_ACTIVE AS IsActive, U.REVISE_NO AS ReviseNo
            FROM UNIT U
			JOIN UNIT UP ON U.UNIT_ID = UP.ID;

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE IF @Action = 'GETALLPARENT'
        BEGIN
            SELECT 
                U.ID AS Id, U.UNIT_NAME AS UnitName, U.UNIT_ID AS UnitId,UP.UNIT_NAME AS ParentUnitName,
                U.RELATIVE_FACTOR AS RelativeFactor, U.IS_ACTIVE AS IsActive, U.REVISE_NO AS ReviseNo
            FROM UNIT U
			LEFT JOIN UNIT UP ON U.UNIT_ID = UP.ID
			WHERE U.UNIT_ID = '0';

            IF @@ROWCOUNT = 0
            BEGIN
                SET @P_SUCCESS = 0;
                SET @P_MSG = 'No records found.';
            END
            ELSE
            BEGIN
                SET @P_SUCCESS = 1;
                SET @P_MSG = 'Records retrieved successfully.';
            END
        END
        ELSE
        BEGIN
            SET @P_SUCCESS = 0;
            SET @P_MSG = 'Invalid Action. Use insert, update, delete, getbyid, or getall.';
        END
    END TRY
    BEGIN CATCH
        SET @P_SUCCESS = 0;
        SET @P_MSG = ERROR_MESSAGE();
    END CATCH
END
GO
