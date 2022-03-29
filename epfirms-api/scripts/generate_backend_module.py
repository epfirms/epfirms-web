#!/usr/bin/python3

import sys
import os
from re import sub

def camel_case(s):
  s = sub(r"(_|-)+", " ", s).title().replace(" ", "")
  return ''.join([s[0].lower(), s[1:]])



module_name = sys.argv[1]
base_path = f"../src/modules/{module_name}/"
sub_directories = ["controllers", "routes", "services", "tests"]
camel_case_name = camel_case(module_name)
pascal_case = module_name.replace('-',' ').title().replace(' ','')


index_template = f"""
import {{ {pascal_case}Controller }} from './{module_name}.controller';

const {camel_case_name}Controller = new {pascal_case}Controller();

export  {{{camel_case_name}Controller}};
"""

controller_template = f"""
import {{ Response, Request }} from 'express';
import {{ StatusConstants }} from '@src/constants/StatusConstants';
import {{ {pascal_case}Service }} from '@modules/{module_name}/services/{module_name}.service';
import {{ Service }} from 'typedi';

@Service()
export class {pascal_case}Controller {{
  constructor() {{}}

    public async upsert(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}
  
    public async delete(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}

public async getAllWithId(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}
}}


"""

routes_template = f"""
import express from 'express';
import {{ {camel_case_name}Controller}} from '@modules/{module_name}/controllers';

const passport = require('passport');

const {camel_case_name}Router = express.Router();

{camel_case_name}Router.post('/', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.upsert(req, res));
{camel_case_name}Router.get('/:id', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.getAllWithId(req, res));
{camel_case_name}Router.delete('/:id', passport.authenticate('bearer', {{ session: false }}), (req, res) => {camel_case_name}Controller.delete(req, res));



export {{ {camel_case_name}Router }};



"""

service_template = f"""
import {{ Database }} from '@src/core/Database';
import {{ Service }} from 'typedi';

@Service()
export class {pascal_case}Service {{
     public static async upsert(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}
  
    public static async delete(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}

public static async getAllWithId(req : Request, res : Response) : Promise<any> {{
        try {{

        }}
        catch (error){{
            console.error(error)
        }}
    }}
}}



"""

for dir in sub_directories:
    os.makedirs(base_path + dir)

with open(f"{base_path}controllers/index.ts", "w") as f:
    f.write(index_template)

with open(f"{base_path}controllers/{module_name}.controller.ts", "w") as f:
    f.write(controller_template)

with open(f"{base_path}routes/index.ts", "w") as f:
    f.write(routes_template)

with open(f"{base_path}services/{module_name}.service.ts", "w") as f:
    f.write(service_template)


print(f"Generating Module: {module_name} complete.")
print("Don't forget to register new Models in the database.ts!")