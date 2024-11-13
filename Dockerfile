# Sử dụng image Node.js cho giai đoạn build
FROM node:18 AS build

# Tạo thư mục làm việc và copy code vào container
WORKDIR /app
COPY . .

# Cài đặt các gói npm và build ứng dụng Angular
RUN npm install
RUN npm run build --prod

# Sử dụng image Nginx để chạy ứng dụng sau khi build xong
FROM nginx:alpine

# Copy các file đã build từ giai đoạn build sang image Nginx
COPY --from=build /app/dist/appchiatien /usr/share/nginx/html

# Copy file cấu hình Nginx (nếu có tùy chỉnh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80 để truy cập ứng dụng
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]