FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Asegurar que la configuración se copie correctamente
RUN mkdir -p /app/build/config

RUN npm run build

# Copiar los archivos de configuración necesarios de src a build si no están siendo copiados automáticamente
RUN cp -r src/config/* build/config/ || echo "Los archivos de configuración ya existen"

RUN cp -r src/models/* build/models/ || echo "Los modelos ya existen"

EXPOSE 3002

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]