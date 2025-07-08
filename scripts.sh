#!/bin/bash

# Script para facilitar o uso do Docker

case "$1" in
    "dev")
        echo "🚀 Iniciando ambiente de desenvolvimento..."
        docker-compose up --build
        ;;
    "prod")
        echo "🚀 Iniciando ambiente de produção..."
        docker-compose up -d --build
        ;;
    "stop")
        echo "🛑 Parando containers..."
        docker-compose down
        ;;
    "clean")
        echo "🧹 Limpando containers e volumes..."
        docker-compose down -v
        docker system prune -f
        ;;
    "logs")
        echo "📄 Exibindo logs da aplicação..."
        docker-compose logs -f app
        ;;
    "minio")
        echo "🗄️ Abrindo MinIO Console..."
        echo "Acesse: http://localhost:9001"
        echo "Usuário: minioadmin"
        echo "Senha: minioadmin"
        ;;
    *)
        echo "Uso: $0 {dev|prod|stop|clean|logs|minio}"
        echo ""
        echo "Comandos disponíveis:"
        echo "  dev    - Inicia ambiente de desenvolvimento"
        echo "  prod   - Inicia ambiente de produção (detached)"
        echo "  stop   - Para todos os containers"
        echo "  clean  - Remove containers e volumes"
        echo "  logs   - Exibe logs da aplicação"
        echo "  minio  - Informações do MinIO Console"
        ;;
esac
