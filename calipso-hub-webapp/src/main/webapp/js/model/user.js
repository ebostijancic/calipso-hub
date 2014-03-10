/*
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
define([ 'model/generic-model', 'component/backgrid-edit-in-modal-button-cell', ],
		function( GenericModel, EditInModalCell) {
			var UserModel = GenericModel.extend({
				modelKey: "user",
				schemaComplete : function() {
					return {//
						userName : {
							"search": 'Text',
							"update": {
								type: 'Text',
								validators : [ 'required' ],
								editorAttrs: { 'readonly': 'readonly' }
							},
							"default": {
								type: 'Text',
								validators : [ 'required' ]
							}
						},
						firstName : {
							"search": 'Text',
							"default": {
								type: 'Text',
								validators : [ 'required' ]
							}
						},
						lastName : {
							"search": 'Text',
							"default": {
								type: 'Text',
								validators : [ 'required' ]
							}
						},
						email : {
							"search": {
								type: 'Text',
								validators : [ 'email' ]
							},
							"default": {
								type: 'Text',
								validators : [ 'required', 'email' ]
							}
						},
					};
				},
			},
			// static members
			{
				className: "UserModel"
			});

			UserModel.prototype.getDefaultSchemaForGrid = function() {
				return [
				{
					name : "userName",
					label : "username",
					cell : "string"
				}, {
					name : "firstName",
					label : "firstName",
					editable : true,
					cell : "string"
				}, {
					name : "lastName",
					label : "lastName",
					editable : true,
					cell : "string"
				}, {
					name : "email",
					label : "email",
					cell : "email"
				}, {
					name : "createdDate",
					label : "created",
					cell : "date"
				}, {
					name : "edit",
					label : "",
					editable : false,
					cell : EditInModalCell
				} ];
			}
			return UserModel;
		});