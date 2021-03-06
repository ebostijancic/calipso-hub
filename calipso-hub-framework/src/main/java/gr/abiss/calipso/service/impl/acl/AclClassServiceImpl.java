package gr.abiss.calipso.service.impl.acl;

import java.util.Date;

import gr.abiss.calipso.jpasearch.service.impl.GenericServiceImpl;
import gr.abiss.calipso.model.acl.AclClass;
import gr.abiss.calipso.model.dto.ReportDataSet;
import gr.abiss.calipso.model.types.AggregateFunction;
import gr.abiss.calipso.model.types.TimeUnit;
import gr.abiss.calipso.repository.acl.AclClassRepository;
import gr.abiss.calipso.service.acl.AclClassService;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.transaction.annotation.Transactional;

@Named("aclClassService")
@Transactional(readOnly = true)
public class AclClassServiceImpl extends
		GenericServiceImpl<AclClass, Long, AclClassRepository> implements
		AclClassService {

	@Override
	@Inject
	public void setRepository(AclClassRepository aclClassRepository) {
		super.setRepository(aclClassRepository);
	}

	@Override
	public AclClass findByClassName(String name) {
		return this.repository.findByClassName(name);
	}


}

