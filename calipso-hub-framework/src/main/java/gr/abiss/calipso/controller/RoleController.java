/**
 * Copyright (c) 2007 - 2013 www.Abiss.gr
 *
 * This file is part of Calipso, a software platform by www.Abiss.gr.
 *
 * Calipso is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Calipso is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Calipso. If not, see http://www.gnu.org/licenses/agpl.html
 */
package gr.abiss.calipso.controller;

import gr.abiss.calipso.controller.AbstractServiceBasedRestController;
import gr.abiss.calipso.model.Role;
import gr.abiss.calipso.service.RoleService;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//import com.wordnik.swagger.annotations.Api;


//@Api(value = "Roles")
@Controller
@RequestMapping(value = "/api/rest/roles", produces = { "application/json", "application/xml" })
public class RoleController extends AbstractServiceBasedRestController<Role, String, RoleService> {

	private static final Logger LOGGER = LoggerFactory.getLogger(RoleController.class);

	@Override
	@Inject
	@Qualifier("roleService") // somehow required for CDI to work on 64bit JDK?
	public void setService(RoleService service) {
		this.service = service;
	}
    
}
