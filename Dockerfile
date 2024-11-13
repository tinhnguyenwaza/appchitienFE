# Sử dụng image Nginx làm web server
FROM nginx:alpine

# Copy các tệp đã build từ thư mục dist vào thư mục mặc định của Nginx
COPY ./dist/appchiatien /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Mở cổng 80 để truy cập ứng dụng
EXPOSE 80

# Chạy Nginx ở chế độ không nền (foreground)
CMD ["nginx", "-g", "daemon off;"]