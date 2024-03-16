from exts import db

"""
class Application:
    id:int primary key
    application_number: str 
    applicant_name: str
    gender: str
    caste: str
    dob: date
    aadhaar_number: str
    ration_card_number: str
    mobile: str
    email: str
    occupation: str
    village: str
    taluka: str
    district: str
    address: str (text)
    grievance_type: str
    description: str (text)
    status: str 
    remarks: str
    assigned_to: str
"""

class Applications(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    application_number = db.Column(db.String(50), nullable=False)
    applicant_name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    caste = db.Column(db.String(50), nullable=True)
    dob = db.Column(db.Date(), nullable=True)
    aadhaar_number = db.Column(db.String(50), nullable=False)
    ration_card_number = db.Column(db.String(50), nullable=True)
    mobile = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(50), nullable=True)
    occupation = db.Column(db.String(20), nullable=True)
    village = db.Column(db.String(50), nullable=True)
    assembly_constituency = db.Column(db.String(50), nullable=True)
    taluka = db.Column(db.String(50), nullable=True)
    district = db.Column(db.String(50), nullable=True)
    address = db.Column(db.Text(), nullable=True)
    grievance_type = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text(), nullable=True)
    application_status = db.Column(db.String(20), nullable=True)
    remarks = db.Column(db.Text(), nullable=True)
    assigned_to = db.Column(db.String(100), nullable=True)


    def __repr__(self):
        return f"<Applications {self.application_number}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self, application_status, assigned_to ):
        self.application_status = application_status
        self.assigned_to = assigned_to
        db.session.commit()


class Users(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.Text(), nullable=False)
    designation = db.Column(db.String(50), nullable=True)
    office_id = db.Column(db.Integer(), nullable=True)
    ac_id = db.Column(db.Integer(), nullable=True)
    taluka_id = db.Column(db.Integer(), nullable=True)
    district_id= db.Column(db.Integer(), nullable=True)

    def __repr__(self):
        return f"<Users {self.username}>"
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Enclosures(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    application_number = db.Column(db.String(50), nullable=False, unique=True)
    document_name = db.Column(db.String(50), nullable=True)
    document_image = db.Column(db.LargeBinary, nullable=True)


    def __repr__(self):
        return f"<Enclosures {self.application_number}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Villages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=True)
    ac_id = db.Column(db.Integer(), nullable=True)
    taluka_id = db.Column(db.Integer(), nullable=True)
    district_id =  db.Column(db.Integer(), nullable=True)


    def __repr__(self):
        return f"<Villages {self.id}"


class Offices(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    ac_id = db.Column(db.Integer(), nullable=False)
    taluka_id = db.Column(db.Integer(), nullable=False)
    district_id = db.Column(db.Integer(), nullable=False)


    def __repr__(self):
        return f"<Offices {self.id}"


class Departments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)


    def __repr__(self):
        return f"<Departments {self.id}"

class Constituencies(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    taluka_id = db.Column(db.Integer(), nullable=False)
    district_id = db.Column(db.Integer(), nullable=False)


    def __repr__(self):
        return f"<Constituencies {self.id}"


class Categories(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    grievance_type = db.Column(db.String(50), nullable=False)
    department_id = db.Column(db.Integer(), nullable=False)

    def __repr__(self):
        return f"<Categories {self.id}"

class Districts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Districts {self.id}"

class Talukas(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    district_id = db.Column(db.Integer(), nullable=False)

    def __repr__(self):
        return f"<Talukas {self.id}"
