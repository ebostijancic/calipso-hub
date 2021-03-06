define([ 'jquery', 'underscore', 'backbone', 'select2', 'backbone-forms' ], function($, _, Backbone, select2) {

	/**
	 * Select2
	 *
	 * A simple Select2 - jQuery based replacement for the Select editor.
	 *
	 * Usage: Works the same as Select editor, with the following extensions for Select2:
	 * schema.config: configuration object passed to Select2
	 * schema.multiple: sets 'multiple' property on the HTML <select>
	 *
	 * Example:
	 * schema: {title: {type:'Select2', options:['Mr','Mrs',Ms], config: {}, multiple: false}
	 */
	Backbone.Form.editors.SimpleTypeSelect2 = Backbone.Form.editors.Select.extend({
		config : {width: "100%"},
		initialize : function(options) {
			Backbone.Form.editors.Select.prototype.initialize.call(this, options);
			options = options || {};
			if(options.schema && options.schema.config){
				this.config = $.extend({}, this.config, options.schema.config);
			}
			if (this.form) {
				var _this = this;
				this.listenToOnce(this.form, "attach", function() {
					_this.onFormAttach();
				});
				this.listenToOnce(this.form, "close", function() {
					_this.onFormClose();
				});
			}
		},
		setValue : function(value) {
//			console.log("setValue, value: ");
//			console.log(value);

			console.log("setValue, value: " + (value?value.id:value));
			this.$el.find('option[selected]').removeAttr('selected');

			// add new selection
			var newValue, id;
			// multiple selection
			if (this.schema.multiple) {
				newValue = [];
				for(var i = 0; i < value.length; i++) {
					id = value[i] && value[i].id ? value[i].id : value[i];
					newValue.push(id);
					this.$el.find('option[value="' + id + '"]').prop('selected', true);
				}
			}
			// single selection
			else{
				id = value && value.id ? value.id : value;
				newValue = id;
				this.$el.find('option[value="' + id + '"]').prop('selected', true);
			}
			this.$el.val(newValue);
			this.$el.trigger("change");
		},
		onFormAttach : function() {
			Backbone.Form.editors.Select.prototype.render.apply(this, arguments);
			var _this = this;
			if (this.schema.multiple) {
				this.$el.prop('multiple', true);
			}

			this.$el.select2(this.config).on("change", function() {
				_this.trigger('change', _this);
			});
			
		},
		onFormClose : function() {
			this.$el.select2('destroy'); 
			if (this.onBeforeClose) {
				this.onBeforeClose();
			}
			this.remove();
			this.unbind();
		},
	});

	/**
	 * ModelSelect2
	 *
	 * A simple Select2 - jQuery based replacement for the Select editor
	 * that selects a model VS a string value.
	 *
	 * Usage: Works the same as Select editor, with the following extensions for Select2:
	 * schema.config: configuration object passed to Select2
	 * schema.multiple: sets 'multiple' property on the HTML <select>
	 *
	 * Example:
	 * schema: {title: {type:'Select2', options:myCollection, config: {}, multiple: false}
	 */
	Backbone.Form.editors.ModelSelect2 = Backbone.Form.editors.SimpleTypeSelect2.extend({
		//  select a model VS a string value.

		getValue : function() {
			var simpleValue = this.$el.val();
//			console.log("Backbone.Form.editors.ModelSelect2#getValue, value: ");
//			console.log(simpleValue);
			var value;
			if(simpleValue){

				if (this.schema.multiple) {
					value = [];
					for (var i = 0; i < simpleValue.length; i++) {
						value.push(this.schema.options.findWhere({
							id : simpleValue[i]
						}));
					}
				} else {
					value = this.schema.options.findWhere({
						id : simpleValue
					});
				}
			}
//			console.log("getValue, simpleValue: " + simpleValue + ", model value: ");
//			console.log(value);
			return value;
		},
	});

	/*
	 * Use the Select2 v4 Theme for Bootstrap, see
	 * https://github.com/fk/select2-bootstrap-theme
	 */
	$.fn.select2.defaults.set("theme", "bootstrap");

});
