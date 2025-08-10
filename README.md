# Game Info Website

เว็บไซต์แสดงข้อมูลเกมที่ใช้บริการ AWS

## AWS Services ที่ใช้

- **S3**: Static website hosting และเก็บไฟล์ดาวน์โหลด
- **API Gateway**: REST API endpoint
- **Lambda**: Backend logic
- **DynamoDB**: เก็บข้อมูลเกม
- **CloudFormation**: Infrastructure as Code

## การ Deploy

1. ติดตั้ง AWS CLI และ configure credentials
2. รัน `deploy.bat`
3. เว็บไซต์จะพร้อมใช้งานที่ S3 website URL

## โครงสร้างไฟล์

- `index.html` - หน้าเว็บหลัก
- `style.css` - CSS styling
- `app.js` - JavaScript สำหรับเชื่อมต่อ AWS
- `aws-infrastructure.yml` - CloudFormation template
- `deploy.bat` - Script สำหรับ deploy