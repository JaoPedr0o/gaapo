-- CreateEnum
CREATE TYPE "TipoCadastro" AS ENUM ('PDF', 'MANUAL');

-- CreateEnum
CREATE TYPE "TipoMovimentacao" AS ENUM ('ENTRADA', 'SAIDA');

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "temperamento" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "nomeImagem" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "nomeImagem" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfiguracaoDoacoes" (
    "id" TEXT NOT NULL,
    "chavePix" TEXT NOT NULL,
    "numeroContaBancaria" TEXT NOT NULL,
    "textoInformativo" TEXT NOT NULL,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoDoacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrestacaoContas" (
    "id" TEXT NOT NULL,
    "tipoCadastro" "TipoCadastro" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "anoReferencia" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorRecebido" DECIMAL(10,2) NOT NULL,
    "valorGasto" DECIMAL(10,2) NOT NULL,
    "saldoFinal" DECIMAL(10,2) NOT NULL,
    "documentoUrl" TEXT,
    "nomeDocumento" TEXT,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrestacaoContas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoFinanceira" (
    "id" TEXT NOT NULL,
    "tipo" "TipoMovimentacao" NOT NULL,
    "data" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "prestacaoContasId" TEXT NOT NULL,

    CONSTRAINT "MovimentacaoFinanceira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuario_key" ON "Administrador"("usuario");

-- AddForeignKey
ALTER TABLE "MovimentacaoFinanceira" ADD CONSTRAINT "MovimentacaoFinanceira_prestacaoContasId_fkey" FOREIGN KEY ("prestacaoContasId") REFERENCES "PrestacaoContas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
